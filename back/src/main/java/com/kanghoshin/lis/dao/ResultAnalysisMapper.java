package com.kanghoshin.lis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.test.TestResultAnalysisDto;
import com.kanghoshin.lis.vo.testanalysis.TestAnalysisChartVo;
import com.kanghoshin.lis.vo.testanalysis.TestAnalysisListVo;

@Mapper
public interface ResultAnalysisMapper {

	
	@Select("SELECT recept_test.reception_date as receptionDate, result_test.result_observed as resultObserved "
			+ "FROM result_test, recept_test, test_prescription, "
			+ "	prescription, patient, consultation_reception, "
			+ "	consultation, prescription_order, recept_collection, specimen, blood_collect "
			+ "WHERE patient.patient_no = consultation_reception.patient_no "
			+ "	AND consultation_reception.consultation_reception_no = consultation.consultation_reception_no "
			+ "	AND consultation.consultation_no = prescription_order.consultation_no "
			+ "  AND prescription_order.prescription_order_no = recept_collection.prescription_order_no"
			+ "  AND recept_collection.specimen_no = specimen.specimen_no"
			+ "  AND blood_collect.specimen_no = specimen.specimen_no"
			+ "  AND blood_collect.specimen_no = recept_test.specimen_no"
			+ "  AND prescription_order.prescription_code = prescription.prescription_code "
			+ "	AND prescription.prescription_code = test_prescription.prescription_code "
			+ "	AND test_prescription.prescription_code = recept_test.prescription_code "
			+ "	AND recept_test.prescription_code = result_test.prescription_code "
			+ "	AND recept_test.specimen_no = result_test.specimen_no "
			+ "	AND prescription.prescription_code = #{testResultAnalysisDto.prescriptionCode} "
			+ "	AND patient.patient_name = #{testResultAnalysisDto.patientName} "
			+ "	AND #{testResultAnalysisDto.startDate} <= recept_test.reception_date "
			+ "	AND recept_test.reception_date <= #{testResultAnalysisDto.endDate} ")	
	List<TestAnalysisListVo> graph(@Param("testResultAnalysisDto") TestResultAnalysisDto testResultAnalysisDto);
	
	@Select("SELECT recept_test.reception_date as receptionDate, "
			+ "	prescription.prescription_code as prescriptionCode, "
			+ "	prescription.prescription_name as prescriptionName, "
			+ "	result_test.result_observed as resultObserved, "
			+ "	test_prescription.test_prescription_reference as testPrescriptionReference "
			+ "FROM result_test, recept_test, test_prescription, "
			+ "	prescription, patient, consultation_reception, "
			+ "	consultation, prescription_order, recept_collection, specimen, blood_collect "			
			+ "WHERE patient.patient_no = consultation_reception.patient_no "
			+ "	AND consultation_reception.consultation_reception_no = consultation.consultation_reception_no "
			+ "	AND consultation.consultation_no = prescription_order.consultation_no "
			+ "  AND prescription_order.prescription_order_no = recept_collection.prescription_order_no"
			+ "  AND recept_collection.specimen_no = specimen.specimen_no"
			+ "  AND blood_collect.specimen_no = specimen.specimen_no"
			+ "  AND blood_collect.specimen_no = recept_test.specimen_no"
			+ "  AND prescription_order.prescription_code = prescription.prescription_code "
			+ "	AND prescription.prescription_code = test_prescription.prescription_code "
			+ "	AND test_prescription.prescription_code = recept_test.prescription_code "
			+ "	AND recept_test.prescription_code = result_test.prescription_code "
			+ "	AND recept_test.specimen_no = result_test.specimen_no "
			+ "	AND prescription.prescription_code = #{testResultAnalysisDto.prescriptionCode} "
			+ "	AND patient.patient_name = #{testResultAnalysisDto.patientName} "
			+ "	AND #{testResultAnalysisDto.startDate} <= recept_test.reception_date "
			+ "	AND recept_test.reception_date <= #{testResultAnalysisDto.endDate} ")	
	List<TestAnalysisChartVo> chart(@Param("testResultAnalysisDto") TestResultAnalysisDto testResultAnalysisDto);
}

