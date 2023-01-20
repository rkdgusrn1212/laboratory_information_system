package com.kanghoshin.lis.service;


import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.AuthMapper;
import com.kanghoshin.lis.dao.StaffMapper;
import com.kanghoshin.lis.dao.ValidationMapper;
import com.kanghoshin.lis.dto.auth.SendCodeDto;
import com.kanghoshin.lis.dto.auth.SignUpDto;
import com.kanghoshin.lis.vo.ValidationVo;

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

	@Override
	public boolean signUp(SignUpDto signUpDto) {
		try {
			staffMapper.insert(signUpDto.getStaff());
			authMapper.insert(signUpDto.getId(), passwordEncoder.encode(signUpDto.getPassword()), UUID.randomUUID().toString(), signUpDto.getStaff().getNo());

			String code = UUID.randomUUID().toString();
			validationMapper.insert(signUpDto.getEmail(), passwordEncoder.encode(code), signUpDto.getId());
			//성공적으로 삽입된 경우에만 발송
			sendEmail(signUpDto.getEmail(), "[KHS] 이메일 인증번호 입니다.", code);
			
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}


	@Override
	public boolean isDuplicatedId(String id) {
		return authMapper.findById(id)!=null;
	}


	@Override
	public boolean sendValidationCode(@Valid SendCodeDto sendCodeDto) {
		ValidationVo validationVo = validationMapper.findByEmail(sendCodeDto.getEmail());
		if(!validationVo.getAuthId().equals(sendCodeDto.getId())) return false;
		
		String code = UUID.randomUUID().toString();
		validationMapper.updateCode(sendCodeDto.getEmail(), passwordEncoder.encode(code));
		sendEmail(sendCodeDto.getEmail(), "[KHS] 이메일 인증번호 입니다.", code);
		return false;
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
