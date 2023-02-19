package com.kanghoshin.lis.vo.collect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectPrescriptionVo {

	private String visitNo;
	private String prescriptionCode;//처방코드
	private String orderNo;//오더번호
	private String orderDate;//오더날짜
	private String testName;//검사명
	private String testContainer;//용기명
	private String fieldName;//검사분야명(검사실)
	private String visitDoctor;//담당의
	private String departmentName;//진료과
	
	private String patientName;
	private String patientNo;
	
	private String specimenNo; //검체번호
	private String printstaffNo;//바코드 출력자
	private String specimenDate;//바코드 출력시간


}
