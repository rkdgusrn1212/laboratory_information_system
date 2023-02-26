package com.kanghoshin.lis.dto.test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TestResultSearchDto {

	private String patientName;

	private int startDate;

	private int endDate;

}