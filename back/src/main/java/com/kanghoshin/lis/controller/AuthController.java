package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.auth.SendCodeDto;
import com.kanghoshin.lis.dto.auth.SignUpDto;
import com.kanghoshin.lis.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("signup")
	public boolean signup(@Valid @RequestBody SignUpDto signUpDto) {
		return authService.signUp(signUpDto);
	}
	
	@PostMapping("refresh-validation-code")
	public boolean refreshValidationCode(@Valid @RequestBody SendCodeDto sendCodeDto) {
		return authService.sendValidationCode(sendCodeDto);
	}
}