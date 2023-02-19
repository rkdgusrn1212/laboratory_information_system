package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.TestPrescriptionMapper;
import com.kanghoshin.lis.dto.testprescription.CreateTestPrescriptionDto;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class TestPrescriptionServiceImpl implements TestPrescriptionService {
	
	private final TestPrescriptionMapper testPrescriptionMapper;

	@Override
	public void createTestPrescription(@NotNull @Valid CreateTestPrescriptionDto createTestPrescriptionDto) {
		testPrescriptionMapper.createTestPrescription(createTestPrescriptionDto);
	}
}
