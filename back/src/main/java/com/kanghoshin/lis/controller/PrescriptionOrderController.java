package com.kanghoshin.lis.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.prescriptionorder.CreatePrescriptionOrderDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.service.PrescriptionOrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/prescription-order")
public class PrescriptionOrderController {
	
	private final PrescriptionOrderService prescriptionOrderService;
	
	@PostMapping
	public void CreatePrescriptionOrderList( @RequestBody CreatePrescriptionOrderDto[] createPrescriptionOrderDto) throws GeneralErrorWithMessageException {
		prescriptionOrderService.createPrescriptionOrderList(createPrescriptionOrderDto);
	}
}
