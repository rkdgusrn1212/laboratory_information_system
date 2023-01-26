package com.kanghoshin.lis.exception.auth;

import com.kanghoshin.lis.vo.error.auth.SignupErrorVo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupFailedException extends Exception {

	private static final long serialVersionUID = -14837415389916002L;

	private SignupErrorVo signupErrorVo;
}
