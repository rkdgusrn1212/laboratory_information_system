package com.kanghoshin.lis.dto.auth;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.ValidationEmailConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateValidationDto {
	
	@NotNull(message="이메일이 비어있음")
	@ValidationEmailConstraints
	private String validationEmail;
}