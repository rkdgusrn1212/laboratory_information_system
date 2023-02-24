package com.kanghoshin.lis.service;

import java.util.Map;

import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.config.jwt.JwtService;
import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.dao.NurseMapper;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NurseServiceImpl implements NurseService{

	private final NurseMapper nurseMapper;
	private final JwtService jwtService;

	@Override
	public Map<String, Object> registerNurse(@NotNull PrincipalDetails principalDetasils) throws GeneralErrorWithMessageException {
		nurseMapper.insert(principalDetasils.getStaffVo().getStaffNo());
		return jwtService.createJwtUpdated(principalDetasils);
	}

}
