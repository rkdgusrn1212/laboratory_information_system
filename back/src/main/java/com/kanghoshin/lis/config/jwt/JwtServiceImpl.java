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
import com.kanghoshin.lis.dao.AuthMapper;
import com.kanghoshin.lis.dao.StaffMapper;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.vo.entity.AuthVo;
import com.kanghoshin.lis.vo.entity.StaffVo;
import com.kanghoshin.lis.vo.error.GeneralErrorWithMessageVo;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {
	
	private final AuthMapper authMapper;
	private final StaffMapper staffMapper;
	private GeneralErrorWithMessageVo cantFindAuthError = new GeneralErrorWithMessageVo("jwtService", "principal과 일치하는 auth가 없습니다.", "CANT_FIND_AUTH");
	private GeneralErrorWithMessageVo cantFindStaffError = new GeneralErrorWithMessageVo("jwtService", "principal과 일치하는 staff가 없습니다.", "CANT_FIND_STAFF");
	
	@Override
	public Map<String, Object> createJwtUpdated(@NotNull PrincipalDetails principalDetails) throws GeneralErrorWithMessageException{
		AuthVo authVo = authMapper.findByAuthId(principalDetails.getUsername());
		if(authVo==null) throw new GeneralErrorWithMessageException(cantFindAuthError);
		StaffVo staffVo = staffMapper.findByStaffNo(authVo.getStaffNo());
		if(staffVo==null) throw new GeneralErrorWithMessageException(cantFindStaffError);
		return createJwt(new PrincipalDetails(authVo, staffVo));
	}
	
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
