package com.kanghoshin.lis.config.jwt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.dto.auth.SignInDto;
import com.kanghoshin.lis.vo.entity.StaffVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

	private final AuthenticationManager authenticationManager;

	// Authentication 객체 만들어서 리턴 => 의존 : AuthenticationManager
	// 인증 요청시에 실행되는 함수 => /login
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

		// request에 있는 username과 password를 파싱해서 자바 Object로 받기
		ObjectMapper om = new ObjectMapper();
		SignInDto signInDto = null;
		try {
			signInDto = om.readValue(request.getInputStream(), SignInDto.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 유저네임패스워드 토큰 생성
		UsernamePasswordAuthenticationToken authenticationToken = 
				new UsernamePasswordAuthenticationToken(
						signInDto.getAuthId(), 
						signInDto.getAuthPassword());

		//인증 프로바이더는 디폴트로 UserDetailService를 가짐 UserDetailService는 Default로 BCryptPasswordEncoder 사용
		Authentication authentication = 
				authenticationManager.authenticate(authenticationToken);

		return authentication;
	}

	// JWT Token 생성해서 response에 담아주기
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

		StaffVo staffVo = principalDetails.getStaffVo();
		Map<String, Object> staffMap =null;
		if(staffVo!=null) {
			ObjectMapper objectMapper = new ObjectMapper();
			staffMap = objectMapper.convertValue(staffVo, Map.class);
		}
		String jwtToken = JWT.create()
				.withSubject(principalDetails.getUsername())
				.withClaim("validation_email", principalDetails.getValidationEmail())
				.withClaim("staff", staffMap)
				.withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))
				.sign(Algorithm.HMAC512(JwtProperties.SECRET));

		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");

		Map<String, Object> principalMap = new HashMap<>();
		principalMap.put("authId", principalDetails.getUsername());
		principalMap.put("validation_email", principalDetails.getValidationEmail());
		principalMap.put("staff", staffMap);
		Map<String, Object> payload = new HashMap<>();
		payload.put("accessToken", JwtProperties.TOKEN_PREFIX+jwtToken);
		payload.put("principal", principalMap);

		response.getWriter().print(new ObjectMapper().writeValueAsString(payload));
	}
}