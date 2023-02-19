package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.testprescription.CreateTestPrescriptionDto;

@Validated
public interface TestPrescriptionService {
	
	void createTestPrescription(@NotNull @Valid CreateTestPrescriptionDto createTestPrescriptionDto);
}
