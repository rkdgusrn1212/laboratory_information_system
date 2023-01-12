package com.kanghoshin.lis.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.MemberMapper;
import com.kanghoshin.lis.model.SignUpDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final MemberMapper memberMapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public boolean signUp(SignUpDto signUpDto) {
		try {
			return memberMapper.insert(signUpDto.getMemberId(), passwordEncoder.encode(signUpDto.getMemberPassword()), signUpDto.getMemberName(), signUpDto.getMemberBirth(),
					signUpDto.getMemberSex(), signUpDto.getMemberPhone(), signUpDto.getMemberEmail(), signUpDto.getMemberImage(),signUpDto.getMemberType())>0;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
	
	@Override
	public boolean isDuplicatedId(String id) {
		return memberMapper.findById(id)!=null;
	}
}
