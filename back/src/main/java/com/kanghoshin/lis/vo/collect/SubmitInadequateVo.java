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
}
