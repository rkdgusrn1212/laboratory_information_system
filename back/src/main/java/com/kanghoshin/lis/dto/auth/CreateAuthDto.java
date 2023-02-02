package com.kanghoshin.lis.dto.auth;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.auth.AuthIdConstraints;
import com.kanghoshin.lis.constraints.auth.AuthPasswordConstraints;
import com.kanghoshin.lis.constraints.validation.ValidationEmailConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAuthDto {

	@NotBlank(message="아이디가 비어있습니다.")
	@AuthIdConstraints
	private String authId;

	@NotBlank(message="비밀번호가 비어있습니다.")
	@AuthPasswordConstraints
	private String authPassword;

	@NotNull(message="인증 이메일이 비어있습니다.")
	@ValidationEmailConstraints
	private String validationEmail;
	
	@NotBlank(message="인증 코드가 비어있습니다.")
	private String validationCode;
}
