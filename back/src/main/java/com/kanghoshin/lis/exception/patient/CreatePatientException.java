package com.kanghoshin.lis.exception.patient;

import com.kanghoshin.lis.vo.error.patient.CreatePatientErrorVo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreatePatientException extends Exception{

	private static final long serialVersionUID = -5563481745982243111L;
	
	private CreatePatientErrorVo createPatientVo;
}
