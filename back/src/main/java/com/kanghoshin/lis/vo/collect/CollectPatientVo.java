package com.kanghoshin.lis.vo.collect;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectPatientVo {


	private int patientNo;// 자동입력값


	private String patientName;


	private String patientAge;

	
	private String patientRrn;


	private String patientMale;

}
