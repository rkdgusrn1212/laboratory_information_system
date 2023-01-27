package com.kanghoshin.lis.controller;


import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.exception.auth.CreateAuthFailedException;
import com.kanghoshin.lis.exception.auth.CreateVallidationFailedException;
import com.kanghoshin.lis.exception.auth.WriteDetailsFailedException;
import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.dto.auth.CreateAuthDto;
import com.kanghoshin.lis.dto.auth.CreateValidationDto;
import com.kanghoshin.lis.dto.auth.DetailsDto;
import com.kanghoshin.lis.dto.auth.RefreshValidaitonCodeDto;
import com.kanghoshin.lis.service.AuthService;
import com.kanghoshin.lis.vo.error.auth.CreateAuthErrorVo;
import com.kanghoshin.lis.vo.error.auth.CreateValidationErrorVo;
import com.kanghoshin.lis.vo.error.auth.WriteDetailsErrorVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("create-validation")
	public void createValidation(@Valid @RequestBody CreateValidationDto createValidationEmailDto) throws CreateVallidationFailedException {
		authService.createValidation(createValidationEmailDto);
	}	

	@ExceptionHandler(CreateVallidationFailedException.class)
	public ResponseEntity<CreateValidationErrorVo> handleCreateVallidationEmailFailedException(CreateVallidationFailedException exception) {
		return new ResponseEntity<CreateValidationErrorVo>(exception.getCreateValidationEmailErrorVo(),HttpStatus.BAD_REQUEST);
	}

	@PostMapping("create-auth")
	public void createAuth(@Valid @RequestBody CreateAuthDto createAuthDto) throws CreateAuthFailedException {
		authService.createAuth(createAuthDto);
	}

	@ExceptionHandler(CreateAuthFailedException.class)
	public ResponseEntity<CreateAuthErrorVo> handleCreateVallidationEmailFailedException(CreateAuthFailedException exception) {
		return new ResponseEntity<CreateAuthErrorVo>(exception.getCreateAuthErrorVo(),HttpStatus.BAD_REQUEST);
	}

	@PostMapping("refresh-validation-code")
	public void refreshValidationCode(@Valid @RequestBody RefreshValidaitonCodeDto sendCodeDto) {
		authService.refreshValidationCode(sendCodeDto);
	}
	

	@PostMapping("write-details")
	public void writeDetailss(@AuthenticationPrincipal PrincipalDetails principalDetasils,
			@Valid @RequestBody DetailsDto detailsDto) throws WriteDetailsFailedException {
		authService.writeDetails(principalDetasils, detailsDto);
	}

	@ExceptionHandler(WriteDetailsFailedException.class)
	public ResponseEntity<WriteDetailsErrorVo> handleSignupFailedException(WriteDetailsFailedException exception) {
		return new ResponseEntity<WriteDetailsErrorVo>(exception.getSignupErrorVo(),HttpStatus.BAD_REQUEST);
	}
}