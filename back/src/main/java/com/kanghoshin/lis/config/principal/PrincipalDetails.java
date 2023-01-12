package com.kanghoshin.lis.config.principal;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.kanghoshin.lis.model.MemberVo;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PrincipalDetails implements UserDetails{

	private static final long serialVersionUID = 7772998674503481744L;
	private final MemberVo memberVo;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(()->{return memberVo.getRole();});
		return authorities;
	}

	@Override
	public String getPassword() {
		return memberVo.getPassword();
	}

	@Override
	public String getUsername() {
		return memberVo.getId();
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
	
	public String getEmail() {
		return memberVo.getEmail();
	}

	public String getPhone() {
		return memberVo.getPhone();
	}
	
	public String getName() {
		return memberVo.getName();
	}
	
	public String getImage() {
		return memberVo.getImage();
	}
	
	public int getType() {
		return memberVo.getType();
	}
	
	public boolean isMale() {
		return memberVo.isMale();
	}
}
