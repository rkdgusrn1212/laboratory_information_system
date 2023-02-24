package com.kanghoshin.lis.service;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;
import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dao.PatientMapper;
import com.kanghoshin.lis.dto.patient.CreatePatientDto;
import com.kanghoshin.lis.dto.patient.ReadPatientListDto;
import com.kanghoshin.lis.vo.entity.PatientVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService{

	private final PatientMapper patientMapper;

	@Override
	public int createPatient(@NotNull @Valid CreatePatientDto patientDto) {
		patientMapper.insert(patientDto);
		return patientDto.getPatientNo();
	}

	@Override
	public PatientVo readPatientByPatientNo(@NoConstraints int patientNo) {
		return patientMapper.findByPatientNo(patientNo);
	}

	@Override
	public List<PatientVo> readPatientList(@Valid ReadPatientListDto readPatientListDto) {
		return patientMapper.select(readPatientListDto);
	}

	@Override
	public PatientVo readPatientByPatientRrn(String patientRrn) {
		return patientMapper.findByPatientRrn(patientRrn);
	}

}
