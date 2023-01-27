package com.kanghoshin.lis.vo.entity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.kanghoshin.lis.constraints.validation.ValidationEmailConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthVo {

	@NotBlank
	@Size(min = 1, max = 40)
	private String authId;

	@Size(min=60, max=60)
	private String authPassword;//null은 인증 불가상태
	
	@NotNull
	@Size(min=36, max=36)
	private String authRefresh;
	
	private int staffNo;
	
	@NotNull
	@ValidationEmailConstraints
	private String validationEmail;
}
