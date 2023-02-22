package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.PrescriptionMapper;
import com.kanghoshin.lis.dto.prescription.CreatePrescriptionDto;
import com.kanghoshin.lis.dto.prescription.ReadPrescriptionListDto;
import com.kanghoshin.lis.vo.entity.PrescriptionVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl implements PrescriptionService{
	
	private final PrescriptionMapper prescriptionMapper;
	
	@Override
	public void createPrescription(@NotNull @Valid CreatePrescriptionDto createCreatePrescriptionDto) {
		prescriptionMapper.createPrescription(createCreatePrescriptionDto);
	}

	@Override
	public PrescriptionVo[] readPrescriptionList(@Valid ReadPrescriptionListDto readPrescriptionListDto) {
		return prescriptionMapper.select(readPrescriptionListDto);
	}
	@Override
	public int count() {
		return prescriptionMapper.count();
	}

}
