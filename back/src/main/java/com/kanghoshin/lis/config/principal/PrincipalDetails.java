package com.kanghoshin.lis.config.principal;

import java.util.ArrayList;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.kanghoshin.lis.vo.entity.AuthVo;
import com.kanghoshin.lis.vo.entity.StaffVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PrincipalDetails implements UserDetails{

	private static final long serialVersionUID = 7772998674503481744L;
	private final AuthVo authVo;
	private final StaffVo staffVo;
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if(staffVo==null) {
			Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			authorities.add(()->{return "ROLE_DETAIL";});
			return authorities;
		}
		return staffVo.getRole();
	}

	@Override
	public String getPassword() {
		return authVo.getAuthPassword();
	}

	@Override
	public String getUsername() {
		return authVo.getAuthId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public String getAuthRefresh() {
		return authVo.getAuthRefresh();
	}
	
	public String getValidationEmail() {
		return authVo.getValidationEmail();
	}
	
	public StaffVo getStaffVo() {
		return staffVo;
	}
}
