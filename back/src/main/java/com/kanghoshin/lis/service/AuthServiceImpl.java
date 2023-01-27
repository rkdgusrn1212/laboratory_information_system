package com.kanghoshin.lis.service;


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

import com.kanghoshin.lis.dao.AuthMapper;
import com.kanghoshin.lis.dao.StaffMapper;
import com.kanghoshin.lis.dao.ValidationMapper;
import com.kanghoshin.lis.exception.auth.CreateAuthFailedException;
import com.kanghoshin.lis.exception.auth.CreateVallidationFailedException;
import com.kanghoshin.lis.exception.auth.SignupFailedException;
import com.kanghoshin.lis.vo.entity.ValidationVo;
import com.kanghoshin.lis.vo.error.auth.CreateAuthErrorVo;
import com.kanghoshin.lis.vo.error.auth.CreateValidationErrorVo;
import com.kanghoshin.lis.vo.error.auth.SignupErrorVo;
import com.kanghoshin.lis.dto.auth.CreateAuthDto;
import com.kanghoshin.lis.dto.auth.CreateValidationDto;
import com.kanghoshin.lis.dto.auth.RefreshValidaitonCodeDto;
import com.kanghoshin.lis.dto.auth.SignUpDto;

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


	@Override
	public void createValidation(@Valid CreateValidationDto createValidationDto) throws CreateVallidationFailedException {
		TransactionStatus txStatus =
				transactionManager.getTransaction(new DefaultTransactionDefinition());
		try {
			String code = UUID.randomUUID().toString();
			validationMapper.insert(createValidationDto.getValidationEmail(), passwordEncoder.encode(code));
			sendEmail(createValidationDto.getValidationEmail(), "[KHS] 이메일 인증번호 입니다.", code);
		}catch(DuplicateKeyException e) {
			transactionManager.rollback(txStatus);
			throw new CreateVallidationFailedException(CreateValidationErrorVo.DUPLICATED_EMAIL);
		}catch(MailException e) {
			transactionManager.rollback(txStatus);
			throw new CreateVallidationFailedException(CreateValidationErrorVo.INVALID_EMAIL);
		}catch(Exception e) {
			transactionManager.rollback(txStatus);
			throw new CreateVallidationFailedException(CreateValidationErrorVo.UNKNOWN);
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
	public void signUp(SignUpDto signUpDto) throws SignupFailedException {
		TransactionStatus txStatus =
				transactionManager.getTransaction(new DefaultTransactionDefinition());
		try {
			staffMapper.insertBySignUpDto(signUpDto);
		}catch(MailException e) {
			transactionManager.rollback(txStatus);
			throw new SignupFailedException(SignupErrorVo.INVALID_EMAIL);
		}catch(Exception e){
			transactionManager.rollback(txStatus);
			throw new SignupFailedException(SignupErrorVo.UNKNOWN);
		}
		transactionManager.commit(txStatus);
	}


	@Override
	public boolean isDuplicatedId(String id) {
		return authMapper.findByAuthId(id)!=null;
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
}
