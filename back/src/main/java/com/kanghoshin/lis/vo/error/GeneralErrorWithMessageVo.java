package com.kanghoshin.lis.vo.error;

import lombok.Getter;

@Getter
public class GeneralErrorWithMessageVo extends GeneralErrorVo {

	private final String code;
	private final String message;

	public GeneralErrorWithMessageVo(String subject, String message, String code) {
		super(subject);
		this.code = code;
		this.message = message;
	}
}