package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.exception.auth.CreateAuthFailedException;
import com.kanghoshin.lis.exception.auth.CreateVallidationFailedException;
import com.kanghoshin.lis.exception.auth.SignupFailedException;
import com.kanghoshin.lis.dto.auth.CreateAuthDto;
import com.kanghoshin.lis.dto.auth.CreateValidationDto;
import com.kanghoshin.lis.dto.auth.RefreshValidaitonCodeDto;
import com.kanghoshin.lis.dto.auth.SignUpDto;
import com.kanghoshin.lis.service.AuthService;
import com.kanghoshin.lis.vo.error.auth.CreateAuthErrorVo;
import com.kanghoshin.lis.vo.error.auth.CreateValidationErrorVo;
import com.kanghoshin.lis.vo.error.auth.SignupErrorVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("signup")
	public void signup(@Valid @RequestBody SignUpDto signUpDto) throws SignupFailedException {
		authService.signUp(signUpDto);
	}

	@ExceptionHandler(SignupFailedException.class)
	public ResponseEntity<SignupErrorVo> handleSignupFailedException(SignupFailedException exception) {
		return new ResponseEntity<SignupErrorVo>(exception.getSignupErrorVo(),HttpStatus.BAD_REQUEST);
	}

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
}