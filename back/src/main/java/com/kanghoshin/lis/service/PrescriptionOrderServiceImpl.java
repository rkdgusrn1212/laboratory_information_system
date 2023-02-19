package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.PrescriptionOrderMapper;
import com.kanghoshin.lis.dto.prescriptionorder.CreatePrescriptionOrderDto;
import com.kanghoshin.lis.dto.prescriptionorder.ReadFullTestPrescriptionOrderListDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.vo.prescriptionorder.FullTestPrescriptionOrderVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrescriptionOrderServiceImpl implements PrescriptionOrderService {

	private final PrescriptionOrderMapper prescriptionOrderMapper;
	
	@Override
	public void createPrescriptionOrderList(@NotNull @Valid CreatePrescriptionOrderDto[] createPrescriptionOrderDto) throws GeneralErrorWithMessageException {
		prescriptionOrderMapper.insertList(createPrescriptionOrderDto);
	}

	@Override
	public FullTestPrescriptionOrderVo[] readFullTestPrescriptionOrderList(
			@Valid ReadFullTestPrescriptionOrderListDto readFullTestPrescriptionOrderListDto) {
		return prescriptionOrderMapper.selectFullTestPrescriptionOrder(readFullTestPrescriptionOrderListDto);
	}
}
