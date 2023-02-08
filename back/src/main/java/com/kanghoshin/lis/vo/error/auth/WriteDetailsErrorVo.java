package com.kanghoshin.lis.vo.error.auth;

import com.kanghoshin.lis.vo.error.GeneralErrorWithMessageVo;

public class WriteDetailsErrorVo extends GeneralErrorWithMessageVo{

	public static final WriteDetailsErrorVo UNKNOWN = new WriteDetailsErrorVo("UNKNOWN","처리과정에서 오류가 발생하였습니다.");

	private WriteDetailsErrorVo(String message, String code) {
		super("writeDetails", message, code);
	}
}
