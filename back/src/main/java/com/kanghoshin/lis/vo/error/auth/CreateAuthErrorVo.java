package com.kanghoshin.lis.vo.error.auth;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kanghoshin.lis.vo.error.GenericErrorVo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum CreateAuthErrorVo implements GenericErrorVo{
	UNKNOWN("UNKNOWN","처리과정에서 오류가 발생하였습니다."), 
	DUPLICATED_ID("DUPLICATED_ID","아이디가 이미 사용중입니다."), 
	WRONG_CODE("WRONG_CODE","인증번호가 틀렸습니다."),
	EMAIL_NOT_EXIST("EMAIL_NOT_EXIST","등록되지 않은 이메일 입니다."), 
	DUPLICATED_EMAIL("DUPLICATED_EMAIL","이메일이 이미 사용중입니다.");

	private final String code;
	private final String message;

	@Override
	public String getSubject() {
		return "createAuth";
	}
}
