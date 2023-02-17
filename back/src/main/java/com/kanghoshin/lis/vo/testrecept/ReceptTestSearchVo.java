package com.kanghoshin.lis.vo.testrecept;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceptTestSearchVo {
	
	private int specimenNo;
	
	private String testSpecimen;
	
	private int testAmount;

	private String testContainer;
	
	private int patientNo;
	
	private String patientName;
	
	private boolean patientMale;
	
	private String PatientRrn;
	
	private String testCode;
	
	private String testName;
	
	private String nurseName;
	
	private Date collectDate;

	private String doctorName;
	
	private Date orderDate;
	
}
