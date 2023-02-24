package com.kanghoshin.lis.controller;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.service.NurseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/nurse")
@RequiredArgsConstructor
public class NurseController {
	private final NurseService nurseService;
	@PostMapping("register")
	public Map<String, Object> registerNurse(@AuthenticationPrincipal PrincipalDetails principalDetasils) throws GeneralErrorWithMessageException {
		return nurseService.registerNurse(principalDetasils);
	}
}
