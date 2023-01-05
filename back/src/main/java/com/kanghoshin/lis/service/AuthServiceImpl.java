package com.kanghoshin.lis.service;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
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
	private final PasswordEncoder passwordEncoder = NoOpPasswordEncoder.getInstance();

	@Override
	public JwtVo signIn(SignInDto SignInDto) {
		AuthVo authVo = authMapper.findById(SignInDto.getId());
		if(authVo==null) return null;
		if(!passwordEncoder.matches(SignInDto.getPwd(),
				authMapper.findById(SignInDto.getId()).getPwd())) {
			return null;
		}
		return new JwtVo(authVo);
	}

	@Override
	public boolean signUp(SignInDto SignInDto) {
		try {
			return authMapper.insert(SignInDto.getId(), SignInDto.getPwd())>0;
		}catch(DataIntegrityViolationException e){
			return false;
		}
	}
	
	@Override
	public boolean isDuplicatedId(String id) {
		return authMapper.findById(id)!=null;
	}
}
