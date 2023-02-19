package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.testprescription.CreateTestPrescriptionDto;
import com.kanghoshin.lis.service.TestPrescriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/test-prescription")
public class TestPrescriptionController {

	private final TestPrescriptionService testPrescriptionService;
	
	@PostMapping
	public void createTestPrescription(@Valid @RequestBody CreateTestPrescriptionDto createTestPrescriptionDto) {
		testPrescriptionService.createTestPrescription(createTestPrescriptionDto);
	}
}
