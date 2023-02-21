package com.kanghoshin.lis.vo.collect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitInadequateVo {

	private String specimenNo;
	private String inadequateTypeCode;
	private String inadequateTypeName;
	private String submitInadequateFrom;
	private String submitInadequateTo;
	private String bloodCollectStaffNo;
	private String collectDate;
	private String receptInadequateDate;
	
	private String orderNo;//오더번호
	private String specimenContainerCode;//용기명
	private String specimenTypeCode;//용기타입콛
	private String prescriptionName;//검사명
	
	private String printstaffNo;//바코드 출력자
	private String specimenDate;//바코드 출력시간

	
	private String patientNo;//환자번호
	private String patientName;//이름
	private String patientMale;//성별 1은 남자 0은 여자
	private String patientRrn;//주민번호
}
