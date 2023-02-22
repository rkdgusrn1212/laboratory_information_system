package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.prescription.CreatePrescriptionDto;
import com.kanghoshin.lis.dto.prescription.ReadPrescriptionListDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.vo.entity.PrescriptionVo;

@Validated
public interface PrescriptionService {
	
	void createPrescription(@NotNull @Valid CreatePrescriptionDto createCreatePrescriptionDto) throws GeneralErrorWithMessageException;

	PrescriptionVo[] readPrescriptionList(@Valid ReadPrescriptionListDto readPrescriptionListDto);
	
	int count();
}
