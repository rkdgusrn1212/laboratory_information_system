package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.vo.testresult.TestResultInputVo;

@Mapper
public interface ResultInputMapper {
	@Select("SELECT specimen.specimen_no as specimenNo, test_prescription.test_specimen as testSpecimen, "
			
			+ "test_prescription.specimen_container_code as testContainer, patient.patient_no as patientNo, "
			
			+ "patient.patient_name as patientName, patient.patient_rrn as patientRrn, "
			
			+ "prescription.prescription_code as prescriptionCode, prescription.prescription_name as prescriptionName, "
			
			+ "prescription_order.prescription_order_time as orderDate, recept_test.staff_no as receptTestStaffNo, "
			
			+ "staff.staff_name as receptTestStaffName, recept_test.reception_date as receptTestDate, "
			
			+ "prescription.test_code as testCode, test_field.test_field_name as fieldName, "
			
			+ "test.test_name  as testName, test.test_reference as testReference "
			
			+ " FROM patient, visit, prescription_order, prescription, test, "
			
			+ "test_field, recept_collection, specimen, blood_collect, recept_test, staff "
			
			+ " WHERE patient.patient_no = visit.patient_no AND visit.visit_no = prescription_order.visit_no "
			
			+ "AND prescription_order.prescription_code = prescription.prescription_code "
			
			+ "AND prescription.test_code = test.test_code "
			
			+ "AND test.test_field_no = test_field.test_field_no "
			
			+ "AND recept_collection.specimen_no = specimen.specimen_no AND specimen.specimen_no = blood_collect.specimen_no "
			
			+ "AND blood_collect.specimen_no = recept_test.specimen_no AND recept_test.test_code = test.test_code "
			
			+ "AND recept_test.specimen_no = #{specimenNo}")
	TestResultInputVo findBySpecimenNo(@Param("specimenNo") int specimenNo);
}
