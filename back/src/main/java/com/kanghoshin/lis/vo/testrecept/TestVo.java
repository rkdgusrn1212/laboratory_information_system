package com.kanghoshin.lis.vo.testrecept;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestVo {

	private String testCode;

	private int fieldNo;

	private String testName;

	private String testSpecimen;

	private String testAmount;

	private String testUnit;

	private String testContainer;

	private String testReference;
}