package com.kanghoshin.lis.config.principal;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.AuthMapper;
import com.kanghoshin.lis.dao.StaffMapper;
import com.kanghoshin.lis.dao.ValidationMapper;
import com.kanghoshin.lis.vo.AuthVo;
import com.kanghoshin.lis.vo.StaffVo;
import com.kanghoshin.lis.vo.ValidationVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService{

	private final ValidationMapper vaidationMapper;
	private final AuthMapper authMapper;
	private final StaffMapper staffMapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("PrincipalDetailsService : 진입");
		ValidationVo validationVo = vaidationMapper.findByEmail(username);
		AuthVo authVo = authMapper.findById(validationVo.getAuthId());
		StaffVo staffVo = staffMapper.findByNo(authVo.getStaffNo());
		return new PrincipalDetails(validationVo, authVo, staffVo);
	}
}