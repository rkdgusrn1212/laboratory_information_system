package com.kanghoshin.lis.dto.test;

import java.util.Date;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TestResultInputDto {

	@NotBlank(message = "바코드가 비어있습니다.")
	private int specimenNo;

	private String testCode;

	private int staffNo;
	
	private int resultObserved;

	private Date resultDate;
}