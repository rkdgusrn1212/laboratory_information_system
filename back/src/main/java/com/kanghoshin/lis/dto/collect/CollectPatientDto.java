package com.kanghoshin.lis.dto.collect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectPatientDto {

	private int id;// 자동입력값

	private String patientName;

	private String patientage;

	private String patientmale;

	private String patientrrn;

}
