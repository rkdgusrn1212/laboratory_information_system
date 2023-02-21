package com.kanghoshin.lis.config.principal;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kanghoshin.lis.vo.entity.AuthVo;
import com.kanghoshin.lis.vo.entity.StaffVo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PrincipalDetails implements UserDetails{

	private static final long serialVersionUID = 7772998674503481744L;
	private List<PrincipalAuthority> authorities;
	private StaffVo staffVo;
	private String username;
	@JsonIgnore
	private String password;
	@JsonIgnore
	private String autoRefresh;
	private String validationEmail;

	public PrincipalDetails(AuthVo authVo, StaffVo staffVo) {
		this.staffVo = staffVo;
		authorities = new ArrayList<PrincipalAuthority>();
		if(staffVo==null) {
			authorities.add(PrincipalAuthority.ROLE_AUTHONLY);//인증 정보만 있음
		}else if(staffVo.getStaffType().equals("NAN")) {
			authorities.add(PrincipalAuthority.ROLE_NANTYPE);
		}else if(!staffVo.isStaffAdmitted()){
			authorities.add(PrincipalAuthority.ROLE_PENDING);//승인 대기중
		}else {
			switch(staffVo.getStaffType()) {
			case "NUR":
				authorities.add(PrincipalAuthority.ROLE_NURSE);
				break;
			case "DOC":
				authorities.add(PrincipalAuthority.ROLE_DOCTOR);
			}
		}
		username = authVo.getAuthId();
		password = authVo.getAuthPassword();
		autoRefresh = authVo.getAuthRefresh();
		validationEmail = authVo.getValidationEmail();
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return true;
	}
}
