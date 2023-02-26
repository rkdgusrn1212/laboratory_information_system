package com.kanghoshin.lis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.test.TestResultInputDto;
import com.kanghoshin.lis.vo.testresult.TestResultInputVo;
import com.kanghoshin.lis.vo.testresult.TestResultVo;

@Mapper
public interface ResultInputMapper {
	@Select("SELECT specimen.specimen_no as specimenNo, specimen_type.specimen_type_name as specimenTypeName, "

			+ "specimen_container.specimen_container_name as specimenContainerName, "

			+ "patient.patient_no as patientNo, "

			+ "patient.patient_name as patientName, patient.patient_rrn as patientRrn, "

			+ "prescription.prescription_code as prescriptionCode, prescription.prescription_name as prescriptionName, "

			+ "DATE_FORMAT(prescription_order.prescription_order_time, '%Y-%m-%d') as prescriptionOrderTime, recept_test.staff_no as receptTestStaffNo, "

			+ "staff.staff_name as receptTestStaffName, DATE_FORMAT(recept_test.reception_date, '%Y-%m-%d') as receptionDate, "

			+ "test_field.test_field_name as testFieldName, "

			+ "test_prescription.test_prescription_reference as testPrescriptionReference "

			+ "FROM patient, consultation_reception, consultation, prescription_order, prescription ,test_prescription ,"

			+ "test_field, specimen_type, specimen_container, recept_collection, specimen, blood_collect, recept_test, staff, doctor "

			+ "WHERE patient.patient_no = consultation_reception.patient_no "

			+ "AND consultation_reception.consultation_reception_no = consultation.consultation_no "

			+ "AND consultation_reception.staff_no = doctor.staff_no "

			+ "AND recept_test.staff_no = staff.staff_no "

			+ "AND prescription_order.consultation_no = consultation.consultation_no "

			+ "AND prescription.prescription_code = prescription_order.prescription_code "

			+ "AND test_prescription.prescription_code = prescription.prescription_code "

			+ "AND test_prescription.specimen_container_code = specimen_container.specimen_container_code "

			+ "AND test_prescription.specimen_type_code = specimen_type.specimen_type_code "

			+ "and recept_collection.prescription_order_no  = prescription_order.prescription_order_no "

			+ "AND test_prescription.test_field_code = test_field.test_field_code "

			+ "AND recept_collection.specimen_no = specimen.specimen_no "

			+ "AND specimen.specimen_no = blood_collect.specimen_no "

			+ "AND blood_collect.specimen_no = recept_test.specimen_no "

			+ "AND recept_test.prescription_code = test_prescription.prescription_code "

			+ "AND recept_test.specimen_no = #{specimenNo}")
	TestResultInputVo findBySpecimenNo(@Param("specimenNo") int specimenNo);

	@Insert("INSERT INTO result_test(specimen_no, prescription_code, staff_no, result_observed, result_date) "
			+ "VALUES(#{testResultInputDto.specimenNo}, #{testResultInputDto.prescriptionCode}, "
			+ " #{testResultInputDto.staffNo}, #{testResultInputDto.resultObserved}, "
			+ " #{testResultInputDto.resultDate})")
	void insert(@Param("testResultInputDto") TestResultInputDto testResultInputDto);
	
	@Select("SELECT * FROM result_test")
	List<TestResultVo> selectResult();
	
	
}
