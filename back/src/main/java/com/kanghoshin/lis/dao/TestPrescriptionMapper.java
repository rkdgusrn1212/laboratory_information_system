package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kanghoshin.lis.dto.testprescription.CreateTestPrescriptionDto;

@Mapper
public interface TestPrescriptionMapper {
	
	@Insert("INSERT INTO test_prescription VALUES( "
			+ "#{createTestPrescriptionDto.prescriptionCode}, "
			+ "#{createTestPrescriptionDto.specimenTypeCode}, "
			+ "#{createTestPrescriptionDto.specimenContainerCode}"
			+ ")")
	int createTestPrescription(@Param("createTestPrescriptionDto") CreateTestPrescriptionDto createTestPrescriptionDto);
}
