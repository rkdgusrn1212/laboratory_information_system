package com.kanghoshin.lis.model;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignInDto {
	@NotBlank(message="아이디가 비어있습니다.")
	private String id;

	@NotBlank(message="비밀번호가 비어있습니다.")
	private String password;
}