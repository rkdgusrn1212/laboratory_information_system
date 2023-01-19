package com.kanghoshin.lis.dto.auth;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpDto {
	@NotBlank
	@Size(min = 1, max = 40)
	private String id;


	@NotBlank(message="비밀번호가 비어있습니다.")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&^])[A-Za-z0-9@$!%*#?&^]{9,40}$", message = 
			"영문, 숫자, 특수문자가 각각 하나이상 포함된 9자 이상 40자 이하의 문자열")
	private String password;
	
	@NotNull
	private InsertStaffDto staff;

	@NotNull(message="이메일이 비어있음")
	@Size(max=350, message="이메일은 최대 350자")
	@Pattern(regexp="^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$", message="이메일 양식이 안맞음")
	private String email;
}
