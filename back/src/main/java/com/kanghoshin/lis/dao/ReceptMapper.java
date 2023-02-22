package com.kanghoshin.lis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.test.TestReceptDto;
import com.kanghoshin.lis.vo.testrecept.ReceptTestListVo;
import com.kanghoshin.lis.vo.testrecept.ReceptTestSearchVo;

@Mapper
public interface ReceptMapper {

	@Select("SELECT specimen.specimen_no as specimenNo, specimen_type.specimen_type_name as specimenTypeName,"

			+ " test_prescription.test_prescription_amount as testPrescriptionAmount,"

			+ " specimen_container.specimen_container_name as specimenContainerName,"

			+ " patient.patient_no as patientNo, patient.patient_name as patientName,"

			+ " patient.patient_male as patientMale, patient.patient_rrn as patientRrn,"

			+ " test_prescription.prescription_code as prescriptionCode, prescription.prescription_name as prescriptionName,"

			+ " staff.staff_name as nurseName, blood_collect.collect_date as collectDate,"

			+ " staff.staff_name as doctorName, prescription_order.prescription_order_time as prescriptionOrderTime"

			+ " FROM patient, consultation_reception, consultation, prescription_order, recept_collection, specimen,"

			+ " blood_collect, prescription, test_prescription, specimen_container, specimen_type, staff, doctor"

			+ " WHERE staff.staff_no = doctor.staff_no "

			+ "AND consultation_reception.staff_no = doctor.staff_no "

			+ "AND consultation_reception.consultation_reception_no = consultation.consultation_reception_no "

			+ "AND prescription_order.consultation_no = consultation.consultation_no "

			+ "AND consultation_reception.patient_no = patient.patient_no "

			+ "AND blood_collect.staff_no = staff.staff_no "

			+ "AND blood_collect.specimen_no = specimen.specimen_no "

			+ "AND recept_collection.specimen_no = specimen.specimen_no "

			+ "AND recept_collection.prescription_order_no = prescription_order.prescription_order_no "

			+ "AND prescription_order.prescription_code = prescription.prescription_code "

			+ "AND test_prescription.prescription_code = prescription.prescription_code "

			+ "AND test_prescription.specimen_type_code = specimen_type.specimen_type_code "

			+ "AND test_prescription.specimen_container_code = specimen_container.specimen_container_code "

			+ "AND blood_collect.specimen_no = #{specimenNo}")
	ReceptTestSearchVo findBySpecimenNo(@Param("specimenNo") int specimenNo);

	@Insert("INSERT INTO recept_test " + "VALUES(#{specimen_no}, #{prescription_code}, #{staff_no}, #{reception_date})")
	void insert(@Param("testReceptDto") TestReceptDto testReceptDto);

	@Select("SELECT recept_test.specimen_no as specimenNo, patient.patient_name as patientName,"

			+ " prescription.prescription_code as prescriptionCode, DATE_FORMAT(prescription_order.prescription_order_time,'%y년 %m월 %d일') as prescriptionOrderTime,"

			+ " DATE_FORMAT(blood_collect.collect_date,'%y년 %m월 %d일') as collectDate, DATE_FORMAT(recept_test.reception_date,'%y년 %m월 %d일') as receptionDate"

			+ " FROM patient, consultation_reception,consultation,prescription_order, prescription,"

			+ " recept_collection, specimen,blood_collect, recept_test"

			+ " WHERE patient.patient_no = consultation_reception.patient_no "

			+ " AND consultation_reception.consultation_reception_no = consultation.consultation_reception_no"
			
			+ " AND consultation.consultation_no = prescription_order.consultation_no"
			
			+ " AND prescription_order.prescription_order_no = recept_collection.prescription_order_no "

			+ " AND recept_collection.specimen_no = specimen.specimen_no "

			+ " AND specimen.specimen_no = blood_collect.specimen_no "

			+ " AND blood_collect.specimen_no = recept_test.specimen_no "

			+ " AND prescription_order.prescription_code = prescription.prescription_code")
	List<ReceptTestListVo> selectByReceptList();

}
