package com.kanghoshin.lis.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInDto {
	@NotBlank(message="아이디가 없습니다.")
	@Size(min=1,max = 20, message="id는 최대 20자까지 가능합니다")
	private String id;

	@NotBlank(message="비밀번호가 없습니다.")
	//@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&^])[A-Za-z0-9@$!%*#?&^]{13,20}$", message = 
	//		"영문, 숫자, 특수문자가 각각 하나이상 포함된 13자 이상 20자 이하의 문자열")
	private String pwd;
}