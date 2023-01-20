package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.auth.VerifyValidationCodeDto;
import com.kanghoshin.lis.dto.auth.RefreshValidaitonCodeDto;
import com.kanghoshin.lis.dto.auth.SignUpDto;

@Validated
public interface AuthService {
	boolean signUp(@Valid SignUpDto SignUpDto);
	boolean isDuplicatedId(@NotBlank(message="아이디가 비어있습니다.") @Size(min=1, max = 20, message= "아이디는 20자 이하입니다.") String id);
	boolean refreshValidationCode(@Valid RefreshValidaitonCodeDto sendCodeDto);
	boolean verifyValidationCode(@Valid VerifyValidationCodeDto receiveCodeDte);
}
