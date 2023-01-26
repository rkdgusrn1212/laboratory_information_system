package com.kanghoshin.lis.config.jwt;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.vo.entity.AuthVo;
import com.kanghoshin.lis.vo.entity.StaffVo;
import com.kanghoshin.lis.vo.entity.ValidationVo;


public class JwtAuthorizationFilter extends BasicAuthenticationFilter{

	public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String header = request.getHeader(JwtProperties.HEADER_STRING);
		if(header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
			chain.doFilter(request, response);
			return;
		}
		String token = request.getHeader(JwtProperties.HEADER_STRING)
				.replace(JwtProperties.TOKEN_PREFIX, "");
		// 토큰 검증 (이게 인증이기 때문에 AuthenticationManager도 필요 없음)
		// 내가 SecurityContext에 집적접근해서 세션을 만들때 자동으로 UserDetailsService에 있는 loadByUsername이 호출됨.
		DecodedJWT decodedJwt = null;
		try {
			decodedJwt = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token);
		}catch(Exception e) {

		}
		if(decodedJwt != null) {
			String authId = decodedJwt.getClaim("auth_id").asString();
			int staffNo = decodedJwt.getClaim("staff_no").asInt();
			PrincipalDetails principalDetails = new PrincipalDetails(
					new ValidationVo(decodedJwt.getSubject(), null, authId),
					new AuthVo(
							decodedJwt.getClaim("auth_id").asString(), null,
							decodedJwt.getClaim("auth_refresh").asString(), staffNo
							),
					new StaffVo(
							staffNo,
							decodedJwt.getClaim("staff_name").asString(),
							decodedJwt.getClaim("staff_birth").asDate(),
							decodedJwt.getClaim("staff_male").asBoolean(),
							decodedJwt.getClaim("staff_phone").asString(),
							decodedJwt.getClaim("staff_image").asString(),
							decodedJwt.getClaim("staff_rrn").asString(),
							decodedJwt.getClaim("staff_admitted").asBoolean(),
							decodedJwt.getClaim("staff_type").asInt()
					));
			Authentication authentication =
					new UsernamePasswordAuthenticationToken(
							principalDetails, //나중에 컨트롤러에서 DI해서 쓸 때 사용하기 편함.
							null, // 패스워드는 모르니까 null 처리, 어차피 지금 인증하는게 아니니까!!
							principalDetails.getAuthorities());

			// 강제로 시큐리티의 세션에 접근하여 값 저장
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		chain.doFilter(request, response);
	}

}