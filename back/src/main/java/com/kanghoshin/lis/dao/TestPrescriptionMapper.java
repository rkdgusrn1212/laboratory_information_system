package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import com.kanghoshin.lis.dto.testprescription.UpdateTestPrescriptionDto;

@Mapper
public interface TestPrescriptionMapper {
	
	@Update("UPDATE test_prescription SET "
			+ "specimen_type_code = #{updateTestPrescriptionDto.specimenTypeCode}, "
			+ "specimen_container_code = #{updateTestPrescriptionDto.specimenContainerCode}, "
			+ "test_prescription_amount = #{updateTestPrescriptionDto.testPrescriptionAmount}, "
			+ "test_prescription_unit = #{updateTestPrescriptionDto.testPrescriptionUnit}, "
			+ "test_prescription_reference = #{updateTestPrescriptionDto.testPrescriptionReference}, "
			+ "test_field_code = #{updateTestPrescriptionDto.testFieldCode} "
			+ "WHERE prescription_code = #{updateTestPrescriptionDto.prescriptionCode}")
	int updateTestPrescription(@Param("updateTestPrescriptionDto") UpdateTestPrescriptionDto updateTestPrescriptionDto);
}
