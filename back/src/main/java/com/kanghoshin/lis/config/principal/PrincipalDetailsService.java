package com.kanghoshin.lis.config.principal;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.AuthMapper;
import com.kanghoshin.lis.dao.StaffMapper;
import com.kanghoshin.lis.vo.entity.AuthVo;
import com.kanghoshin.lis.vo.entity.StaffVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService{

	private final AuthMapper authMapper;
	private final StaffMapper staffMapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AuthVo authVo = authMapper.findByAuthId(username);
		if(authVo==null) throw new UsernameNotFoundException("존재하지 않는 아이디입니다.");
		StaffVo staffVo = staffMapper.findByStaffNo(authVo.getStaffNo());
		return new PrincipalDetails(authVo, staffVo);
	}
}