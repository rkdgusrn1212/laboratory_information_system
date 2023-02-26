package com.kanghoshin.lis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.test.TestResultSearchDto;
import com.kanghoshin.lis.vo.testresult.TestResultListVo;

@Mapper
public interface ResultMapper {

//	@Select("SELECT result_test.specimen_no as specimenNo, specimen_type.specimen_type_name as specimeTypeName, "
//			+ "patient.patient_no as patientNo, patient.patient_name as patientName, "
//			+ "result_test.prescription_code as prescriptionCode, prescription.prescription_name as prescriptionName, "
//			+ "recept_test.reception_date as receptionDate "
//			+ "FROM patient, consultation_reception, consultation, prescription_order, "
//			+ "recept_collection, specimen, blood_collect, recept_test, result_test, prescription, test_prescription, specimen_type "
//			+ "WHERE patient.patient_no = consultation_reception.patient_no "
//			+ "AND consultation_reception.consultation_reception_no = consultation.consultation_reception_no "
//			+ "AND consultation.consultation_no = prescription_order.consultation_no "
//			+ "AND prescription_order.prescription_order_no  = recept_collection.prescription_order_no "
//			+ "AND recept_collection.specimen_no = specimen.specimen_no "
//			+ "AND specimen.specimen_no = blood_collect.specimen_no "
//			+ "AND blood_collect.specimen_no = recept_test.specimen_no "
//			+ "AND recept_test.specimen_no = result_test.specimen_no "
//			+ "AND recept_test.prescription_code = test_prescription.prescription_code "
//			+ "AND prescription_order.prescription_code = prescription.prescription_code "
//			+ "AND prescription.prescription_code = test_prescription.prescription_code "
//			+ "AND test_prescription.specimen_type_code =specimen_type.specimen_type_code "
//			+ "AND test_prescription.prescription_code = result_test.prescription_code ")
//	List<TestResultListVo> selectByResultList();
	
	@Select("SELECT patient.patient_no as patientNo, patient.patient_name as patientName, "
			+ "result_test.prescription_code as prescriptionCode, prescription.prescription_name as prescriptionName, "
			+ "specimen_type.specimen_type_name as specimeTypeName, recept_test.reception_date as receptionDate "
			+ "FROM patient, consultation_reception, consultation, prescription_order, "
			+ "recept_collection, specimen, blood_collect, recept_test, result_test, prescription, test_prescription, specimen_type "
			+ "WHERE patient.patient_no = consultation_reception.patient_no "
			+ "AND consultation_reception.consultation_reception_no = consultation.consultation_reception_no "
			+ "AND consultation.consultation_no = prescription_order.consultation_no "
			+ "AND prescription_order.prescription_order_no  = recept_collection.prescription_order_no "
			+ "AND recept_collection.specimen_no = specimen.specimen_no "
			+ "AND specimen.specimen_no = blood_collect.specimen_no "
			+ "AND blood_collect.specimen_no = recept_test.specimen_no "
			+ "AND recept_test.prescription_code = result_test.prescription_code "
			+ "AND recept_test.prescription_code = test_prescription.prescription_code "
			+ "AND prescription_order.prescription_code = prescription.prescription_code "
			+ "AND recept_test.specimen_no = result_test.specimen_no "
			+ "AND prescription.prescription_code = test_prescription.prescription_code "
			+ "AND test_prescription.specimen_type_code =specimen_type.specimen_type_code "
			+ "AND test_prescription.prescription_code = result_test.prescription_code ")
	List<TestResultListVo> selectByResultList();

	@Select("SELECT patient.patient_no as patientNo, patient.patient_name as patientName, "
			+ "result_test.prescription_code as prescriptionCode, prescription.prescription_name as prescriptionName, "
			+ "specimen_type.specimen_type_name as specimeTypeName, recept_test.reception_date as receptionDate "
			+ "FROM patient, consultation_reception, consultation, prescription_order, "
			+ "recept_collection, specimen, blood_collect, recept_test, result_test, prescription, test_prescription, specimen_type "
			+ "WHERE patient.patient_no = consultation_reception.patient_no "
			+ "AND consultation_reception.consultation_reception_no = consultation.consultation_reception_no "
			+ "AND consultation.consultation_no = prescription_order.consultation_no "
			+ "AND prescription_order.prescription_order_no  = recept_collection.prescription_order_no "
			+ "AND recept_collection.specimen_no = specimen.specimen_no "
			+ "AND specimen.specimen_no = blood_collect.specimen_no "
			+ "AND blood_collect.specimen_no = recept_test.specimen_no "
			+ "AND recept_test.prescription_code = result_test.prescription_code "
			+ "AND recept_test.prescription_code = test_prescription.prescription_code "
			+ "AND prescription_order.prescription_code = prescription.prescription_code "
			+ "AND recept_test.specimen_no = result_test.specimen_no "
			+ "AND prescription.prescription_code = test_prescription.prescription_code "
			+ "AND test_prescription.specimen_type_code =specimen_type.specimen_type_code "
			+ "AND test_prescription.prescription_code = result_test.prescription_code "
			+ "AND patient.patient_name LIKE CONCAT('%',#{testResultSearchDto.patientName},'%') "
			+ "AND #{testResultSearchDto.startDate} <= recept_test.reception_date "
			+ "and recept_test.reception_date <= #{testResultSearchDto.endDate} ")
	List<TestResultListVo> selectByPatient(@Param("testResultSearchDto") TestResultSearchDto testResultSearchDto);
}
