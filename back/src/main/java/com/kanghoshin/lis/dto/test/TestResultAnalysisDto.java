package com.kanghoshin.lis.dto.test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TestResultAnalysisDto {
	
	private String patientName;
	
	private String prescriptionCode;
	
	private String startDate;

	private String endDate;
}
