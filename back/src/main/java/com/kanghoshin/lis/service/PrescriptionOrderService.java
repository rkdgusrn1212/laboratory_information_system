package com.kanghoshin.lis.service;


import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.prescriptionorder.CreatePrescriptionOrderDto;
import com.kanghoshin.lis.dto.prescriptionorder.ReadFullTestPrescriptionOrderListDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.vo.prescriptionorder.FullTestPrescriptionOrderVo;

@Validated
public interface PrescriptionOrderService {
	
	void createPrescriptionOrderList(@NotNull @Valid CreatePrescriptionOrderDto[] createPrescriptionOrderDto) throws GeneralErrorWithMessageException;
	
	FullTestPrescriptionOrderVo[] readFullTestPrescriptionOrderList(@Valid ReadFullTestPrescriptionOrderListDto readFullTestPrescriptionOrderListDto);
}
