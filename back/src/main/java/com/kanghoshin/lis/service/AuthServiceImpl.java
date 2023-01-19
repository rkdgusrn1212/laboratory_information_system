package com.kanghoshin.lis.service;


import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.AuthMapper;
import com.kanghoshin.lis.dao.StaffMapper;
import com.kanghoshin.lis.dao.ValidationMapper;
import com.kanghoshin.lis.dto.auth.SignUpDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final ValidationMapper validationMapper;
	private final AuthMapper authMapper;
	private final StaffMapper staffMapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public boolean signUp(SignUpDto signUpDto) {
		try {
			staffMapper.insert(signUpDto.getStaff());
			authMapper.insert(signUpDto.getId(), passwordEncoder.encode(signUpDto.getPassword()), UUID.randomUUID().toString(), signUpDto.getStaff().getNo());
			validationMapper.insert(signUpDto.getEmail(), passwordEncoder.encode("1234"), signUpDto.getId());
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
}
