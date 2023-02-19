package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kanghoshin.lis.dto.prescription.CreatePrescriptionDto;

@Mapper
public interface PrescriptionMapper {
	
	@Insert("INSERT INTO prescription VALUES( "
			+ "#{createPrescriptionDto.prescriptionCode}, "
			+ "#{createPrescriptionDto.behaviorCode}, "
			+ "#{createPrescriptionDto.prescriptionName}, "
			+ "null, "
			+ "#{createPrescriptionDto.prescriptionSlipCode}, "
			+ "#{createPrescriptionDto.prescriptionComment})")
	int createPrescription(@Param("createPrescriptionDto")CreatePrescriptionDto createPrescriptionDto);
}
