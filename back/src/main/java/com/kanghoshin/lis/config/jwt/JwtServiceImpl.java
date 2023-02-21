package com.kanghoshin.lis.config.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kanghoshin.lis.config.principal.PrincipalDetails;


@Service
public class JwtServiceImpl implements JwtService {

	
	@Override
	public Map<String, Object> createJwt(@NotNull PrincipalDetails principalDetails) {
		ObjectMapper objectMapper = new ObjectMapper();
		@SuppressWarnings("unchecked")
		Map<String, Object> principalMap = objectMapper.convertValue(principalDetails, Map.class);
		String jwtToken = JWT.create()
				.withSubject(principalDetails.getUsername())
				.withClaim("principal", principalMap)
				.withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))
				.sign(Algorithm.HMAC512(JwtProperties.SECRET));
		Map<String, Object> payload = new HashMap<>();
		payload.put("accessToken", JwtProperties.TOKEN_PREFIX+jwtToken);
		payload.put("principal", principalMap);
		return payload;
	}
}
