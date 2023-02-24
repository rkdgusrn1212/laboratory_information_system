package com.kanghoshin.lis.service;

import java.util.Map;

import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;

@Validated
public interface NurseService {
	Map<String, Object> registerNurse(@NotNull PrincipalDetails principalDetasils) throws GeneralErrorWithMessageException;
}
