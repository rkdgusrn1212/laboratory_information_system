package com.kanghoshin.lis.exception.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupFailedException extends Exception {

	private static final long serialVersionUID = -14837415389916002L;

	public enum ErrorCode{
		UNKNOWN, DUPLICATED_EMAIL, DUPLICATED_ID, INVALID_EMAIL
	}
	private ErrorCode errorCode;
}
