package com.kanghoshin.lis.dto.collect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecimenDto {

	private String specimenNo;// 자동입력값

	private String staffNo; //입력 받는값

	private String specimenDate;
	
	private String orderNo;	// recept_collection테이블에 삽입되는 오더no

	private String specimenContainerCode;
}
