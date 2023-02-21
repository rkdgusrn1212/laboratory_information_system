package com.kanghoshin.lis.config.principal;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PrincipalAuthority implements GrantedAuthority{

	ROLE_AUTHONLY("ROLE_AUTHONLY"), ROLE_NANTYPE("ROLE_NANTYPE"), ROLE_PENDING("ROLE_PENDING"), ROLE_NURSE("ROLE_NURSE"), ROLE_DOCTOR("ROLE_DOCTOR");
	
	private String authority;
}
