package com.kanghoshin.lis.service;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dto.patient.CreatePatientDto;
import com.kanghoshin.lis.dto.patient.ReadPatientListDto;
import com.kanghoshin.lis.vo.entity.PatientVo;

@Validated
public interface PatientService {
	
	int createPatient(@NotNull @Valid CreatePatientDto patientDto);
	
	PatientVo readPatientByPatientNo(@NoConstraints int patientNo);
	PatientVo readPatientByPatientRrn(String patientRrn);
	
	List<PatientVo> readPatientList(@Valid ReadPatientListDto readPatientListDto);
}
