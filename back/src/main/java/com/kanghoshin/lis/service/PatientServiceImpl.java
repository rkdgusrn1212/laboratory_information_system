package com.kanghoshin.lis.service;

import javax.validation.Valid;

import org.springframework.stereotype.Service;
import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dao.PatientMapper;
import com.kanghoshin.lis.dto.patient.PatientDto;
import com.kanghoshin.lis.exception.patient.CreatePatientException;
import com.kanghoshin.lis.vo.entity.PatientVo;
import com.kanghoshin.lis.vo.error.patient.CreatePatientErrorVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService{

	private final PatientMapper patientMapper;

	@Override
	public void createPatient(@Valid PatientDto patientDto) throws CreatePatientException {
		try{
			patientMapper.insert(patientDto);
		}catch(Exception e) {
			throw new CreatePatientException(CreatePatientErrorVo.UNKNOWN);
		}
	}

	@Override
	public PatientVo readPatientByPatientNo(@NoConstraints int patientNo) {
		return patientMapper.findByPatientNo(patientNo);
	}

}
