package com.kanghoshin.lis.vo.error.auth;

import com.kanghoshin.lis.vo.error.GeneralErrorWithMessageVo;

public class CreateAuthErrorVo extends GeneralErrorWithMessageVo{
	private CreateAuthErrorVo(String message, String code) {
		super("createAuth", message, code);
	}
	public static final CreateAuthErrorVo UNKNOWN = new CreateAuthErrorVo("UNKNOWN","처리과정에서 오류가 발생하였습니다.");
	public static final CreateAuthErrorVo DUPLICATED_ID = new CreateAuthErrorVo("DUPLICATED_ID","아이디가 이미 사용중입니다."); 
	public static final CreateAuthErrorVo WRONG_CODE = new CreateAuthErrorVo("WRONG_CODE","인증번호가 틀렸습니다.");
	public static final CreateAuthErrorVo EMAIL_NOT_EXIST = new CreateAuthErrorVo("EMAIL_NOT_EXIST","등록되지 않은 이메일 입니다."); 
	public static final CreateAuthErrorVo DUPLICATED_EMAIL = new CreateAuthErrorVo("DUPLICATED_EMAIL","이메일이 이미 사용중입니다.");
}
