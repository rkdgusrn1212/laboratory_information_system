package com.kanghoshin.lis.vo.testrecept;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReceptTestListVo {

	private int specimenNo;
	
	private String patientName;
	
	private String testCode;
	
	private String orderDate;
	
	private String collectDate;
	
	private String receptionDate;
}
