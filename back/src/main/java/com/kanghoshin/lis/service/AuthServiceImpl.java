package com.kanghoshin.lis.service;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.kanghoshin.lis.dao.AuthMapper;
import com.kanghoshin.lis.model.AuthVo;
import com.kanghoshin.lis.model.SignInDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final AuthMapper authMapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public boolean signUp(SignInDto signInDto) {
		try {
			return authMapper.insert(signInDto.getId(), passwordEncoder.encode(signInDto.getPwd()), signInDto.getRole())>0;
		}catch(DataIntegrityViolationException e){
			return false;
		}
	}
	
	@Override
	public boolean isDuplicatedId(String id) {
		return authMapper.findById(id)!=null;
	}
}
