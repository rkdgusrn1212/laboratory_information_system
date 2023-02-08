package com.kanghoshin.lis.vo.error.auth;

import com.kanghoshin.lis.vo.error.GeneralErrorWithMessageVo;

public class IssueValidationCodeErrorVo extends GeneralErrorWithMessageVo {
	private IssueValidationCodeErrorVo(String message, String code) {
		super("issueValidationError", message, code);
	}
	public static final IssueValidationCodeErrorVo UNKNOWN = new IssueValidationCodeErrorVo("UNKNOWN","처리과정에서 오류가 발생하였습니다.");
	public static final IssueValidationCodeErrorVo DUPLICATED_EMAIL = new IssueValidationCodeErrorVo("DUPLICATED_EMAIL","이메일이 이미 사용중입니다.");
	public static final IssueValidationCodeErrorVo INVALID_EMAIL = new IssueValidationCodeErrorVo("INVALID_EMAIL","인증번호를 발송할 수 없습니다. 이메일을 확인해주세요.");
}
