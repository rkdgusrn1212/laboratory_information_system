package com.kanghoshin.lis.dto.consultationreception;

import com.kanghoshin.lis.constraints.NoConstraints;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CreateConsultationWalkInDto {

	@NoConstraints
	private int staffNo;
	@NoConstraints
	private int patientNo;
}
