package com.kanghoshin.lis.service;

import java.util.Map;

import javax.validation.Valid;
import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.exception.auth.CreateAuthFailedException;
import com.kanghoshin.lis.exception.auth.IssueVallidationCodeFailedException;
import com.kanghoshin.lis.exception.auth.UpdateDetailsFailedException;
import com.kanghoshin.lis.exception.auth.WriteDetailsFailedException;
import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.dto.auth.CreateAuthDto;
import com.kanghoshin.lis.dto.auth.issueValidationCodeDto;
import com.kanghoshin.lis.dto.auth.RefreshValidaitonCodeDto;
import com.kanghoshin.lis.dto.auth.UpdateDetailsDto;
import com.kanghoshin.lis.dto.auth.DetailsDto;

@Validated
public interface AuthService {
	void issueValidationCode(@Valid issueValidationCodeDto issueValidationCodeDto) throws IssueVallidationCodeFailedException;
	void createAuth(@Valid CreateAuthDto createAuthDto) throws CreateAuthFailedException;
	Map<String, Object> writeDetails(PrincipalDetails principalDetails, @Valid DetailsDto detailDto) throws WriteDetailsFailedException, GeneralErrorWithMessageException;
	boolean refreshValidationCode(@Valid RefreshValidaitonCodeDto sendCodeDto);
	boolean isExist(String authId);
	Map<String, Object> updateDetails(PrincipalDetails principalDetails, @Valid UpdateDetailsDto detailDto) throws GeneralErrorWithMessageException, UpdateDetailsFailedException;
}
