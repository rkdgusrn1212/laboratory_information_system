package com.kanghoshin.lis.vo.error.auth;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kanghoshin.lis.vo.error.GenericErrorVo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum WriteDetailsErrorVo implements GenericErrorVo{
	UNKNOWN("UNKNOWN","처리과정에서 오류가 발생하였습니다.");
	
	private final String code;
	private final String message;
	
	@Override
	public String getSubject() {
		return "signup";
	}
}
