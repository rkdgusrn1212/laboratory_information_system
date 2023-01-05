package com.kanghoshin.lis.service;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.model.AuthVo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class JwtVo {
	@NotNull
	private AuthVo authVo;
}
