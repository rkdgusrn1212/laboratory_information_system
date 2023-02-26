package com.kanghoshin.lis.vo.testanalysis;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TestAnalysisChartVo {

	private String receptionDate;

	private String prescriptionCode;
	
	private String prescriptionName;
	
	private String resultObserved;
	
	private String testPrescriptionReference;

}