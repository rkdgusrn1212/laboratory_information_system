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
import com.kanghoshin.lis.dto.auth.VerifyValidationCodeDto;
import com.kanghoshin.lis.exception.auth.CreateVallidationEmailFailedException;
import com.kanghoshin.lis.exception.auth.SignupFailedException;
import com.kanghoshin.lis.vo.entity.ValidationVo;
import com.kanghoshin.lis.vo.error.auth.CreateValidationEmailErrorVo;
import com.kanghoshin.lis.vo.error.auth.SignupErrorVo;
import com.kanghoshin.lis.dto.auth.CreateValidationEmailDto;
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
	public void createValidationEmail(@Valid CreateValidationEmailDto createValidationEmailDto) throws CreateVallidationEmailFailedException {
	    TransactionStatus txStatus =
	            transactionManager.getTransaction(new DefaultTransactionDefinition());
		try {
			String code = UUID.randomUUID().toString();
			validationMapper.insert(createValidationEmailDto.getValidationEmail(), passwordEncoder.encode(code));
			sendEmail(createValidationEmailDto.getValidationEmail(), "[KHS] 이메일 인증번호 입니다.", code);
		}catch(DuplicateKeyException e) {
			transactionManager.rollback(txStatus);
			throw new CreateVallidationEmailFailedException(CreateValidationEmailErrorVo.DUPLICATED_EMAIL);
		}catch(MailException e) {
			transactionManager.rollback(txStatus);
			throw new CreateVallidationEmailFailedException(CreateValidationEmailErrorVo.INVALID_EMAIL);
		}catch(Exception e) {
			transactionManager.rollback(txStatus);
			throw new CreateVallidationEmailFailedException(CreateValidationEmailErrorVo.UNKNOWN);
		}
		transactionManager.commit(txStatus);
	}
	
	@Override
	public void signUp(SignUpDto signUpDto) throws SignupFailedException {
	    TransactionStatus txStatus =
	            transactionManager.getTransaction(new DefaultTransactionDefinition());
		boolean insertAuthSuccess = false;
		try {
			staffMapper.insertBySignUpDto(signUpDto);
			authMapper.insert(signUpDto.getAuthId(), passwordEncoder.encode(signUpDto.getAuthPassword()),
					UUID.randomUUID().toString(), signUpDto.getStaffNo());
			insertAuthSuccess = true;
		}catch(DuplicateKeyException e) {
			transactionManager.rollback(txStatus);
			throw new SignupFailedException(insertAuthSuccess?SignupErrorVo.DUPLICATED_EMAIL:SignupErrorVo.DUPLICATED_ID);
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
		return authMapper.findById(id)!=null;
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
	public boolean verifyValidationCode(@Valid VerifyValidationCodeDto receiveCodeDto) {
		try {
			ValidationVo validationVo = validationMapper.findByEmail(receiveCodeDto.getEmail());
			if(!passwordEncoder.matches(receiveCodeDto.getCode(), validationVo.getCode())) return false;
			return validationMapper.updateCode(validationVo.getEmail(), null) > 0;
		}catch(Exception e) {
			return false;
		}
	}
}
