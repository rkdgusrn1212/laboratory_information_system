package com.kanghoshin.lis.exception.auth;

import com.kanghoshin.lis.vo.error.auth.CreateAuthErrorVo;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateAuthFailedException extends Exception {

	private static final long serialVersionUID = 3726295373586220959L;
	private CreateAuthErrorVo createAuthErrorVo;
}
