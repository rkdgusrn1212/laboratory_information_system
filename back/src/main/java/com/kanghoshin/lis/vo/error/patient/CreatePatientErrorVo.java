package com.kanghoshin.lis.vo.error.patient;

import com.kanghoshin.lis.vo.error.GeneralErrorWithMessageVo;

public class CreatePatientErrorVo extends GeneralErrorWithMessageVo{
	
	private CreatePatientErrorVo( String message, String code) {
		super("createPatient", message, code);
	}
	public final static CreatePatientErrorVo UNKNOWN = new CreatePatientErrorVo("UNKNOWN", "처리과정에서 오류가 발생하였습니다.");
}
