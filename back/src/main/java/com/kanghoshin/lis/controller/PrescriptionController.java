package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.prescription.CreatePrescriptionDto;
import com.kanghoshin.lis.dto.prescription.ReadPrescriptionListDto;
import com.kanghoshin.lis.service.PrescriptionService;
import com.kanghoshin.lis.vo.entity.PrescriptionVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/prescription")
@RequiredArgsConstructor
public class PrescriptionController {

	private final PrescriptionService prescriptionService;
	
	@PostMapping
	public void createPrescription(@Valid @RequestBody CreatePrescriptionDto createPrescriptionDto) {
		prescriptionService.createPrescription(createPrescriptionDto);
	}
	
	@GetMapping("list")
	public PrescriptionVo[] readPrescriptionList(@Valid ReadPrescriptionListDto readPrescriptionListDto) {
		return prescriptionService.readPrescriptionList(readPrescriptionListDto);
	}
}
