package com.kanghoshin.lis.service;

import javax.validation.Valid;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dto.patient.PatientDto;
import com.kanghoshin.lis.exception.patient.CreatePatientException;
import com.kanghoshin.lis.vo.entity.PatientVo;

@Validated
public interface PatientService {
	
	void createPatient(@Valid PatientDto patientDto) throws CreatePatientException;
	
	PatientVo readPatientByPatientNo(@NoConstraints int patientNo);
}
