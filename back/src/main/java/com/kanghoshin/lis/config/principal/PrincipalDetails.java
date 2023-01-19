package com.kanghoshin.lis.config.principal;

import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.kanghoshin.lis.vo.AuthVo;
import com.kanghoshin.lis.vo.StaffVo;
import com.kanghoshin.lis.vo.ValidationVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PrincipalDetails implements UserDetails{

	private static final long serialVersionUID = 7772998674503481744L;
	private final ValidationVo validationVo;
	private final AuthVo authVo;
	private final StaffVo staffVo;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return staffVo.getRole();
	}

	@Override
	public String getPassword() {
		return authVo.getPassword();
	}

	@Override
	public String getUsername() {
		return authVo.getId();
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
	
	public String getRefresh() {
		return authVo.getRefresh();
	}
	
	public String getEmail() {
		return validationVo.getEmail();
	}
	
	public int getStaffNo() {
		return staffVo.getNo();
	}
	
	public Date getBirth() {
		return staffVo.getBirth();
	}
	
	public String getRrn() {
		return staffVo.getRrn();
	}
	
	public boolean getAdmitted() {
		return staffVo.isAdmitted();
	}

	public String getPhone() {
		return staffVo.getPhone();
	}
	
	public String getName() {
		return staffVo.getName();
	}
	
	public String getImage() {
		return staffVo.getImage();
	}
	
	public int getType() {
		return staffVo.getType();
	}
	
	public boolean isMale() {
		return staffVo.isMale();
	}
}
