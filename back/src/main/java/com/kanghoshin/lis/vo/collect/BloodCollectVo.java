package com.kanghoshin.lis.vo.collect;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodCollectVo {

	private String specimenNo;// 자동입력값


	private String staffNo;

	private String collectDate;

}
