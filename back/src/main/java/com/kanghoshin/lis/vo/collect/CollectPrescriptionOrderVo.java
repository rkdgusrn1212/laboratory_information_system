package com.kanghoshin.lis.vo.collect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectPrescriptionOrderVo {

	private String visitNo;
	private String patientNo;//환자번호
	private String visitDate;//내원날짜
	private String visitDoctor;//의사명
	private String departmentName;//진료과
}
