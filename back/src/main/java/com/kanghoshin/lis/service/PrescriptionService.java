package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.prescription.CreatePrescriptionDto;

@Validated
public interface PrescriptionService {
	
	void createPrescription(@NotNull @Valid CreatePrescriptionDto creaetCreatePrescriptionDto);

}
