package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.auth.VerifyValidationCodeDto;
import com.kanghoshin.lis.exception.auth.SignupFailedException;
import com.kanghoshin.lis.dto.auth.RefreshValidaitonCodeDto;
import com.kanghoshin.lis.dto.auth.SignUpDto;
import com.kanghoshin.lis.service.AuthService;
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
	
	@PostMapping("refresh-validation-code")
	public void refreshValidationCode(@Valid @RequestBody RefreshValidaitonCodeDto sendCodeDto) {
		authService.refreshValidationCode(sendCodeDto);
	}
	
	@PostMapping("verify-validation-code")
	public void verifyValidationCode(@Valid @RequestBody VerifyValidationCodeDto receiveCodeDto) {
		authService.verifyValidationCode(receiveCodeDto);
	}
}