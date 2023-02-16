package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kanghoshin.lis.dto.consultationreception.CreateConsultationWalkInDto;

@Mapper
public interface ConsultationReceptionMapper {

	@Insert("INSERT INTO consultation_reception"
			+ "( staff_no, patient_no )"
			+ "VALUES (#{createConsultationWalkInDto.staffNo}, #{createConsultationWalkInDto.patientNo})")
	int insertWalkIn(@Param("createConsultationWalkInDto")CreateConsultationWalkInDto createConsultationWalkInDto);
}
