package com.kanghoshin.lis.vo.testrecept;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceptTestSearchVo {
	
	private int specimenNo;
	
	private String specimenTypeName;
	
	private int testPrescriptionAmount;

	private String specimenContainerName;
	
	private int patientNo;
	
	private String patientName;
	
	private boolean patientMale;
	
	private String patientRrn;
	
	private String prescriptionCode;
	
	private String prescriptionName;
	
	private String nurseName;
	
	private String collectDate;

	private String doctorName;
	
	private String prescriptionOrderTime;
	
}
