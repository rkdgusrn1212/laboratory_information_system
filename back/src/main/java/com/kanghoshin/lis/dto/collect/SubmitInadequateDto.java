package com.kanghoshin.lis.dto.collect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitInadequateDto {

	private String specimenNo;

	private String inadequateTypeCode;

	private String submitInadequateFrom;

	private String submitInadequateTo;

	private String collectDate;// 입력시 자동 삽입
}
