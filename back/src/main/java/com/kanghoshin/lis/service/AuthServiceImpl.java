package com.kanghoshin.lis.service;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Override
	public JwtVo signIn(SignInDto SignInDto) {
		AuthVo authVo = authMapper.findById(SignInDto.getId());
		if(authVo==null) return null;
		if(!passwordEncoder.matches(SignInDto.getPwd(),
				authVo.getPwd())) {
			return null;
		}
		return new JwtVo(authVo);
	}

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
