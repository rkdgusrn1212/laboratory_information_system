package com.kanghoshin.lis.vo.collect;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectSpecimenVo {

	private String specimenNo;

	private String testName;//검사명
	private String testContainer;//용기명
	private String patientNo;//환자번호
	private String fieldName;//검사분야명
	private String printstaffNo;//바코드 출력자
	private String specimenDate;//바코드 출력시간

}
