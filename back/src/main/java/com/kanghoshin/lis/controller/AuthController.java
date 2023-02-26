package com.kanghoshin.lis.controller;


import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.exception.auth.CreateAuthFailedException;
import com.kanghoshin.lis.exception.auth.IssueVallidationCodeFailedException;
import com.kanghoshin.lis.exception.auth.UpdateDetailsFailedException;
import com.kanghoshin.lis.exception.auth.WriteDetailsFailedException;
import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.dto.auth.CreateAuthDto;
import com.kanghoshin.lis.dto.auth.issueValidationCodeDto;
import com.kanghoshin.lis.dto.auth.DetailsDto;
import com.kanghoshin.lis.dto.auth.RefreshValidaitonCodeDto;
import com.kanghoshin.lis.dto.auth.UpdateDetailsDto;
import com.kanghoshin.lis.service.AuthService;
import com.kanghoshin.lis.vo.error.auth.CreateAuthErrorVo;
import com.kanghoshin.lis.vo.error.auth.IssueValidationCodeErrorVo;
import com.kanghoshin.lis.vo.error.auth.WriteDetailsErrorVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("issue-validation-code")//환자도 사용가능
	public void issueValidationCode(@Valid @RequestBody issueValidationCodeDto issueValidationCodeDto) throws IssueVallidationCodeFailedException {
		authService.issueValidationCode(issueValidationCodeDto);
	}	

	@ExceptionHandler(IssueVallidationCodeFailedException.class)
	public ResponseEntity<IssueValidationCodeErrorVo> handleCreateVallidationEmailFailedException(IssueVallidationCodeFailedException exception) {
		return new ResponseEntity<IssueValidationCodeErrorVo>(exception.getIssueValidationCodeErrorVo(),HttpStatus.BAD_REQUEST);
	}

	@PostMapping("create-auth")//모두가 사용가능
	public void createAuth(@Valid @RequestBody CreateAuthDto createAuthDto) throws CreateAuthFailedException {
		authService.createAuth(createAuthDto);
	}

	@ExceptionHandler(CreateAuthFailedException.class)
	public ResponseEntity<CreateAuthErrorVo> handleCreateVallidationEmailFailedException(CreateAuthFailedException exception) {
		return new ResponseEntity<CreateAuthErrorVo>(exception.getCreateAuthErrorVo(),HttpStatus.BAD_REQUEST);
	}

	@PostMapping("refresh-validation-code")//모두가 사용가능
	public void refreshValidationCode(@Valid @RequestBody RefreshValidaitonCodeDto sendCodeDto) {
		authService.refreshValidationCode(sendCodeDto);
	}
	

	@PostMapping("write-details")//AUTHONLY
	public Map<String, Object> writeDetails(@AuthenticationPrincipal PrincipalDetails principalDetasils,
			@Valid @RequestBody DetailsDto detailsDto) throws WriteDetailsFailedException, GeneralErrorWithMessageException {
		return authService.writeDetails(principalDetasils, detailsDto);
	}
	

	@PostMapping("update-details")//직원만 사용
	public Map<String, Object> updateDetails(@AuthenticationPrincipal PrincipalDetails principalDetasils,
			@Valid @RequestBody UpdateDetailsDto detailsDto) throws  GeneralErrorWithMessageException, UpdateDetailsFailedException {
		return authService.updateDetails(principalDetasils, detailsDto);
	}


	@ExceptionHandler(WriteDetailsFailedException.class)
	public ResponseEntity<WriteDetailsErrorVo> handleSignupFailedException(WriteDetailsFailedException exception) {
		return new ResponseEntity<WriteDetailsErrorVo>(exception.getWriteDetailErrorVo(),HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("is-exist")//모두가
	public boolean isExist(@RequestParam("authId") String authId) {
		return authService.isExist(authId);
	}
}