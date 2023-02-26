package com.kanghoshin.lis.vo.testresult;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TestResultListVo {


	private String specimeTypeName;
	
	private String patientNo;
	
	private String patientName;
	
	private String prescriptionCode;

	private String prescriptionName;
	
	private String receptionDate;
}