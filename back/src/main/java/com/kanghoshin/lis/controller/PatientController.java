package com.kanghoshin.lis.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dto.patient.PatientDto;
import com.kanghoshin.lis.dto.patient.ReadPatientListDto;
import com.kanghoshin.lis.exception.patient.CreatePatientException;
import com.kanghoshin.lis.service.PatientService;
import com.kanghoshin.lis.vo.entity.PatientVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/patient")
@RequiredArgsConstructor
@Validated
public class PatientController {

	private final PatientService patientService;
	
	@PostMapping
	public void createPatient(@Valid @RequestBody PatientDto patientDto) throws CreatePatientException {		
		patientService.createPatient(patientDto);
	}
	
	@GetMapping("{no}")
	public PatientVo readPatient(@PathVariable("no")
	@NoConstraints int patientNo) {
		return patientService.readPatientByPatientNo(patientNo);
	}
	
	@GetMapping("list")
	public List<PatientVo> readPatientList(@Nullable @Valid ReadPatientListDto readPatientListDto){
		return patientService.readPatientList(readPatientListDto);
	}
}
