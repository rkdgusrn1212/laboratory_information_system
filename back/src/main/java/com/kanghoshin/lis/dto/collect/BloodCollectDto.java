package com.kanghoshin.lis.dto.collect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodCollectDto {

	private String specimenNo;// 자동입력값

	private String staffNo;

	private String collectDate;

}
