package com.kanghoshin.lis.vo.error.auth;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kanghoshin.lis.vo.error.GenericErrorVo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum CreateValidationErrorVo implements GenericErrorVo{
	UNKNOWN("UNKNOWN","처리과정에서 오류가 발생하였습니다."), 
	DUPLICATED_EMAIL("DUPLICATED_EMAIL","이메일이 이미 사용중입니다."), 
	INVALID_EMAIL("INVALID_EMAIL","인증번호를 발송할 수 없습니다. 이메일을 확인해주세요.");
	
	private final String code;
	private final String message;
	
	@Override
	public String getSubject() {
		return "createValidation";
	}
}
