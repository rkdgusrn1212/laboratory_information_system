package com.kanghoshin.lis.dto.auth;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.EmailConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateValidationEmailDto {
	
	@NotNull(message="이메일이 비어있음")
	@EmailConstraints
	private String validationEmail;
}
