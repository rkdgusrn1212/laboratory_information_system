package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.exception.auth.CreateAuthFailedException;
import com.kanghoshin.lis.exception.auth.IssueVallidationCodeFailedException;
import com.kanghoshin.lis.exception.auth.WriteDetailsFailedException;
import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.dto.auth.CreateAuthDto;
import com.kanghoshin.lis.dto.auth.issueValidationCodeDto;
import com.kanghoshin.lis.dto.auth.RefreshValidaitonCodeDto;
import com.kanghoshin.lis.dto.auth.DetailsDto;

@Validated
public interface AuthService {
	void issueValidationCode(@Valid issueValidationCodeDto issueValidationCodeDto) throws IssueVallidationCodeFailedException;
	void createAuth(@Valid CreateAuthDto createAuthDto) throws CreateAuthFailedException;
	int writeDetails(PrincipalDetails principalDetails, @Valid DetailsDto detailDto) throws WriteDetailsFailedException;
	boolean isDuplicatedId(@NotBlank(message="아이디가 비어있습니다.") @Size(min=1, max = 20, message= "아이디는 20자 이하입니다.") String id);
	boolean refreshValidationCode(@Valid RefreshValidaitonCodeDto sendCodeDto);
}
