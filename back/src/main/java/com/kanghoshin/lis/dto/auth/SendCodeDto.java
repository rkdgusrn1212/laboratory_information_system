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
public class SendCodeDto {
	
	@NotBlank
	@Size(min = 1, max = 40)
	private String id;
	
	@NotNull(message="이메일이 비어있음")
	@Size(max=350, message="이메일은 최대 350자")
	@Pattern(regexp="^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$", message="이메일 양식이 안맞음")
	private String email;
}