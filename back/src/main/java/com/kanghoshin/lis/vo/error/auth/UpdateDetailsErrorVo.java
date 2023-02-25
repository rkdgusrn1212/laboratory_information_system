package com.kanghoshin.lis.vo.error.auth;

import com.kanghoshin.lis.vo.error.GeneralErrorWithMessageVo;

public class UpdateDetailsErrorVo extends GeneralErrorWithMessageVo{

	public static final UpdateDetailsErrorVo UNKNOWN = new UpdateDetailsErrorVo("UNKNOWN","처리과정에서 오류가 발생하였습니다.");

	private UpdateDetailsErrorVo(String message, String code) {
		super("updateDetails", message, code);
	}
}
