package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.PrescriptionMapper;
import com.kanghoshin.lis.dto.prescription.CreatePrescriptionDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl implements PrescriptionService{
	
	private final PrescriptionMapper prescriptionMapper;
	
	@Override
	public void createPrescription(@NotNull @Valid CreatePrescriptionDto creaetCreatePrescriptionDto) {
		prescriptionMapper.createPrescription(creaetCreatePrescriptionDto);
	}

}
