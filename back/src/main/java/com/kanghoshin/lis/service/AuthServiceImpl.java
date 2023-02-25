package com.kanghoshin.lis.service;


import java.util.Map;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.kanghoshin.lis.config.jwt.JwtService;
import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.dao.AuthMapper;
import com.kanghoshin.lis.dao.StaffMapper;
import com.kanghoshin.lis.dao.ValidationMapper;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.exception.auth.CreateAuthFailedException;
import com.kanghoshin.lis.exception.auth.IssueVallidationCodeFailedException;
import com.kanghoshin.lis.exception.auth.UpdateDetailsFailedException;
import com.kanghoshin.lis.exception.auth.WriteDetailsFailedException;
import com.kanghoshin.lis.vo.entity.ValidationVo;
import com.kanghoshin.lis.vo.error.auth.CreateAuthErrorVo;
import com.kanghoshin.lis.vo.error.auth.IssueValidationCodeErrorVo;
import com.kanghoshin.lis.vo.error.auth.UpdateDetailsErrorVo;
import com.kanghoshin.lis.vo.error.auth.WriteDetailsErrorVo;
import com.kanghoshin.lis.dto.auth.CreateAuthDto;
import com.kanghoshin.lis.dto.auth.issueValidationCodeDto;
import com.kanghoshin.lis.dto.auth.RefreshValidaitonCodeDto;
import com.kanghoshin.lis.dto.auth.UpdateDetailsDto;
import com.kanghoshin.lis.dto.auth.DetailsDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final ValidationMapper validationMapper;
	private final AuthMapper authMapper;
	private final StaffMapper staffMapper;
	private final PasswordEncoder passwordEncoder;
	private final JavaMailSender emailSender;
	@Value("${spring.mail.username}")
	private String adminEmail;
	private final PlatformTransactionManager transactionManager;
	private final JwtService jwtService;

	@Override
	public void issueValidationCode(@Valid issueValidationCodeDto issueValidationCodeDto) throws IssueVallidationCodeFailedException {
		TransactionStatus txStatus =
				transactionManager.getTransaction(new DefaultTransactionDefinition());
		try {
			String code = UUID.randomUUID().toString();
			ValidationVo validationVo = validationMapper.findByValidationEmail(issueValidationCodeDto.getValidationEmail());
			if(validationVo==null) {
				validationMapper.insert(issueValidationCodeDto.getValidationEmail(), passwordEncoder.encode(code));	
			}else {
				if(validationVo.getValidationCode()==null) {//이미 인증된 이메일
					throw new IssueVallidationCodeFailedException(IssueValidationCodeErrorVo.DUPLICATED_EMAIL);
				}
				if(validationMapper.updateCode(issueValidationCodeDto.getValidationEmail(), passwordEncoder.encode(code))<1)
					throw new IssueVallidationCodeFailedException(IssueValidationCodeErrorVo.UNKNOWN);
			}
			sendEmail(issueValidationCodeDto.getValidationEmail(), "[KHS] 이메일 인증번호 입니다.", code);
		}catch(IssueVallidationCodeFailedException e) {
			transactionManager.rollback(txStatus);
			throw e;
		}catch(MailException e) {
			transactionManager.rollback(txStatus);
			throw new IssueVallidationCodeFailedException(IssueValidationCodeErrorVo.INVALID_EMAIL);
		}catch(Exception e) {
			transactionManager.rollback(txStatus);
			throw new IssueVallidationCodeFailedException(IssueValidationCodeErrorVo.UNKNOWN);
		}
		transactionManager.commit(txStatus);
	}

	@Override
	public void createAuth(@Valid CreateAuthDto createAuthDto) throws CreateAuthFailedException {
		TransactionStatus txStatus =
				transactionManager.getTransaction(new DefaultTransactionDefinition());
		try {
			ValidationVo validationVo = validationMapper.findByValidationEmail(createAuthDto.getValidationEmail());
			if(validationVo==null) throw new CreateAuthFailedException(CreateAuthErrorVo.EMAIL_NOT_EXIST);
			if(validationVo.getValidationCode()==null) {
				throw new CreateAuthFailedException(CreateAuthErrorVo.DUPLICATED_EMAIL);
			}
			if(!passwordEncoder.matches(createAuthDto.getValidationCode(), validationVo.getValidationCode())) {
				throw new CreateAuthFailedException(CreateAuthErrorVo.WRONG_CODE);
			}
			authMapper.insert(createAuthDto.getAuthId(), passwordEncoder.encode(createAuthDto.getAuthPassword()),
					UUID.randomUUID().toString(), createAuthDto.getValidationEmail());
		}catch(DuplicateKeyException e) {
			transactionManager.rollback(txStatus);
			throw new CreateAuthFailedException(CreateAuthErrorVo.DUPLICATED_ID);
		}catch(CreateAuthFailedException e) {
			transactionManager.rollback(txStatus);
			throw e;
		}catch(Exception e) {
			transactionManager.rollback(txStatus);
			throw new CreateAuthFailedException(CreateAuthErrorVo.UNKNOWN);
		}
		transactionManager.commit(txStatus);
	}


	@Override
	public Map<String, Object> writeDetails(PrincipalDetails principalDetails, @Valid DetailsDto detailsDto) throws WriteDetailsFailedException, GeneralErrorWithMessageException {
		try {
			staffMapper.insertDetailsDto(detailsDto, principalDetails.getUsername());
		}catch(Exception e) {
			throw new WriteDetailsFailedException(WriteDetailsErrorVo.UNKNOWN);
		}
		return jwtService.createJwtUpdated(principalDetails);
	}

	@Override
	public boolean refreshValidationCode(@Valid RefreshValidaitonCodeDto sendCodeDto) {
		try {
			String code = UUID.randomUUID().toString();
			if(validationMapper.updateCode(sendCodeDto.getEmail(), passwordEncoder.encode(code))<1)return false;
			sendEmail(sendCodeDto.getEmail(), "[KHS] 이메일 인증번호 입니다.", code);
			return true;
		}catch(Exception e) {
			return false;
		}
	}

	private void sendEmail(String to, String title, String content) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(adminEmail);
		message.setTo(to);
		message.setSubject(title);
		message.setText(content);
		emailSender.send(message);
	}

	@Override
	public boolean isExist(String authId) {
		return authMapper.findByAuthId(authId)!=null;
	}

	@Override
	public Map<String, Object> updateDetails(PrincipalDetails principalDetails, @Valid UpdateDetailsDto detailDto)
			throws GeneralErrorWithMessageException, UpdateDetailsFailedException {
		int result = 0;
		try {
			result = staffMapper.update(detailDto, principalDetails.getStaffVo().getStaffNo());
		}catch(Exception e) {
			e.printStackTrace();
			throw new UpdateDetailsFailedException(UpdateDetailsErrorVo.UNKNOWN);
		}
		if(result<1) 
			throw new UpdateDetailsFailedException(UpdateDetailsErrorVo.UNKNOWN);
		return jwtService.createJwtUpdated(principalDetails);
	}

}
