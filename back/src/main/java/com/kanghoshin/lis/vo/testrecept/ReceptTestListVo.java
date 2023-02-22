package com.kanghoshin.lis.vo.testrecept;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReceptTestListVo {

	private int specimenNo;
	
	private String patientName;
	
	private String prescriptionCode;
	
	private String prescriptionOrderTime;
	
	private String collectDate;
	
	private String receptionDate;
}
