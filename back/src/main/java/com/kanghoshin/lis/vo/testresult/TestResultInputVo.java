package com.kanghoshin.lis.vo.testresult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResultInputVo {

	private int specimenNo;

	private String specimenTypeName;

	private String specimenContainerName;

	private int patientNo;

	private String patientName;

	private String patientRrn;

	private String prescriptionCode;

	private String prescriptionName;

	private String prescriptionOrderTime;

	private int receptTestStaffNo;

	private String receptTestStaffName;

	private String receptionDate;

	private String testFieldName;

	private String testPrescriptionReference;
}
