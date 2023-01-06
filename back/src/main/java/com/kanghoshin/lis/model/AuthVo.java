package com.kanghoshin.lis.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthVo {

	@NotBlank
	@Size(min = 1, max = 20)
	private String id;

	@NotNull
	@Size(min=60, max=60)
	private String pwd;
	
	@NotNull
	@Pattern(regexp="DOC|NUR")
	private String role;
}
