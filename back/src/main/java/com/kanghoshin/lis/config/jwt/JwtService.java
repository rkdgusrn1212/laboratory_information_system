package com.kanghoshin.lis.config.jwt;

import java.util.Map;

import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.config.principal.PrincipalDetails;

@Validated
public interface JwtService {
	
	Map<String, Object> createJwt(@NotNull PrincipalDetails principalDetails);
}
