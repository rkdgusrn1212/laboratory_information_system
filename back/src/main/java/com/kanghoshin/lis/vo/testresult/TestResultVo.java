package com.kanghoshin.lis.vo.testresult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResultVo {

	private int specimenNo;

	private String prescriptionCode;

	private int staffNo;

	private float resultObserved;

	private String resultDate;
}