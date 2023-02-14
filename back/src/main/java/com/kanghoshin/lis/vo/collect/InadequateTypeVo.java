package com.kanghoshin.lis.vo.collect;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InadequateTypeVo {

	private String inadequateTypeCode;// 자동입력값
	private String inadequateTypeName;
	private String inadequateTypeBriefExplanation;

}
