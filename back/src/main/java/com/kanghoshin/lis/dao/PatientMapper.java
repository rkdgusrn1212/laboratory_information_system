package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.patient.PatientDto;
import com.kanghoshin.lis.vo.entity.PatientVo;

@Mapper
public interface PatientMapper {
	
	@Select("SELECT patient_no as patientNo"
			+ ", patient_name as patientName"
			+ ", patient_male as patientMale"
			+ ", patient_phone as patientPhone"
			+ ", patient_rrn as patientRrn"
			+ ", patient_birth as patientBirth"
			+ ", patient_address as patientAddress FROM patient "
			+ "WHERE patient_no = #{patient_no}")
	PatientVo findByPatientNo(@Param("patient_no") int patientNo);
	
	@Insert("INSERT INTO patient "
			+ "(patient_no, patient_name, patient_male, patient_phone, patient_rrn, patient_birth, patient_address) "
			+ "VALUES (null"
			+ ", #{patientDto.patientName}"
			+ ", #{patientDto.patientMale}"
			+ ", #{patientDto.patientPhone}"
			+ ", #{patientDto.patientRrn}"
			+ ", #{patientDto.patientBirth}"
			+ ", #{patientDto.patientAddress}) ")
	int insert(@Param("patientDto") PatientDto patientDto);
}
