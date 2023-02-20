package com.kanghoshin.lis.vo.testresult;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResultInputVo {

	private int specimenNo;

	private String testSpecimen;

	private String testContainer;

	private int patientNo;

	private String patientName;

	private String patientRrn;

	private String prescriptionCode;

	private String prescriptionName;

	private Date orderDate;

	private int receptTestStaffNo;

	private String receptTestStaffName;

	private Date receptTestDate;
	
	private String testCode;

	private String fieldName;

	private String testName;

	private String testReference;
}
