package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.testprescription.UpdateTestPrescriptionDto;
import com.kanghoshin.lis.service.TestPrescriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/test-prescription")
public class TestPrescriptionController {

	private final TestPrescriptionService testPrescriptionService;
	
	@PatchMapping//의사만
	public void createTestPrescription(@Valid @RequestBody UpdateTestPrescriptionDto createTestPrescriptionDto) {
		testPrescriptionService.updateTestPrescription(createTestPrescriptionDto);
	}
}
