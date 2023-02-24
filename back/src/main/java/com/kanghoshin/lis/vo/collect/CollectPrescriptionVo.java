package com.kanghoshin.lis.vo.collect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectPrescriptionVo {

	private String consultationNo;
	private String consultationTime;
	
	private String departmentName;//진료과
	private String visitDoctor;//담당의
	
	private String prescriptionCode;//처방코드
	private String prescriptionName;//처방이름 (검사명)

	private String orderNo;//오더번호
	private String specimenTypeCode;
	private String specimenTypeName;
	



}
