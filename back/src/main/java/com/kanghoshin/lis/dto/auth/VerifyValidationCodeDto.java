package com.kanghoshin.lis.dto.auth;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.validation.ValidationEmailConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VerifyValidationCodeDto {
	
	@NotBlank
	private String code;
	
	@NotNull(message="이메일이 비어있음")
	@ValidationEmailConstraints
	private String email;
}
