package com.kanghoshin.lis.controller;


import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.prescriptionorder.CreatePrescriptionOrderDto;
import com.kanghoshin.lis.dto.prescriptionorder.ReadFullTestPrescriptionOrderListDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.service.PrescriptionOrderService;
import com.kanghoshin.lis.vo.prescriptionorder.FullTestPrescriptionOrderVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/prescription-order")
public class PrescriptionOrderController {
	
	private final PrescriptionOrderService prescriptionOrderService;
	
	@PostMapping//의사만 사용
	public void createPrescriptionOrderList( @RequestBody CreatePrescriptionOrderDto[] createPrescriptionOrderDto) throws GeneralErrorWithMessageException {
		prescriptionOrderService.createPrescriptionOrderList(createPrescriptionOrderDto);
	}
	
	@GetMapping("full-test-prescription-order/list")//타모듈에서 사용
	public FullTestPrescriptionOrderVo[] readFullTestPrescriptionOrderList(@Valid ReadFullTestPrescriptionOrderListDto readFullTestPrescriptionOrderListDto) {
		return prescriptionOrderService.readFullTestPrescriptionOrderList(readFullTestPrescriptionOrderListDto);
	}
}
