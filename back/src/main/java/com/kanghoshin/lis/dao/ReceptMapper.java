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

	@Select("SELECT\n" + "	specimen.specimen_no as specimenNo,"
			+ "	specimen_type.specimen_type_name as specimenTypeName,"
			+ "	full_test_prescription_order.test_prescription_amount as testPrescriptionAmount,"
			+ "	specimen_container.specimen_container_name as specimenContainerName,"
			+ "	patient.patient_no as patientNo," + "	patient.patient_name as patientName,"
			+ "	patient.patient_male as patientMale," + "	patient.patient_rrn as patientRrn,"
			+ "	full_test_prescription_order.prescription_code as prescriptionCode,"
			+ "	full_test_prescription_order.prescription_name as prescriptionName,"
			+ "	staff.staff_name as nurseName,"
			+ "	DATE_FORMAT(blood_collect.collect_date,'%Y-%m-%d') as collectDate,"
			+ "	staff.staff_name as doctorName,"
			+ "	DATE_FORMAT(full_test_prescription_order.prescription_order_time,'%Y-%m-%d') as prescriptionOrderTime" 
			+ " FROM"
			+ "	patient," + " full_test_prescription_order," + "	recept_collection," + "	specimen,"
			+ "	blood_collect," + "	specimen_container," + "	specimen_type," + "	staff," + "	doctor" + " WHERE"
			+ " blood_collect.specimen_no = specimen.specimen_no"
			+ " AND full_test_prescription_order.staff_no = doctor.staff_no"
			+ " AND full_test_prescription_order.patient_no = patient.patient_no"
			+ " AND recept_collection.prescription_order_no = full_test_prescription_order.prescription_order_no"
			+ " AND recept_collection.specimen_no = specimen.specimen_no"
			+ " AND blood_collect.staff_no = staff.staff_no"
			+ " AND full_test_prescription_order.specimen_type_code = specimen_type.specimen_type_code"
			+ " AND full_test_prescription_order.specimen_container_code = specimen_container.specimen_container_code"
			+ " AND blood_collect.specimen_no = #{specimenNo}")
	List<ReceptTestSearchVo> findBySpecimenNo(@Param("specimenNo") int specimenNo);

	@Insert("INSERT INTO recept_test(specimen_no, prescription_code,staff_no,reception_date) "
			+ "VALUES(#{testReceptDto.specimenNo}, #{testReceptDto.prescriptionCode}, #{testReceptDto.staffNo}, DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d'))")
	void insert(@Param("testReceptDto") TestReceptDto testReceptDto);

	@Select("SELECT recept_test.specimen_no as specimenNo, patient.patient_name as patientName,"

			+ " prescription.prescription_code as prescriptionCode, DATE_FORMAT(prescription_order.prescription_order_time,'%Y-%m-%d') as prescriptionOrderTime,"

			+ " DATE_FORMAT(blood_collect.collect_date,'%Y-%m-%d') as collectDate, DATE_FORMAT(recept_test.reception_date,'%Y-%m-%d') as receptionDate"

			+ " FROM patient, consultation_reception,consultation,prescription_order, prescription,"

			+ " recept_collection, specimen,blood_collect, recept_test, test_prescription"

			+ " WHERE patient.patient_no = consultation_reception.patient_no "

			+ " AND consultation_reception.consultation_reception_no = consultation.consultation_reception_no"

			+ " AND consultation.consultation_no = prescription_order.consultation_no"

			+ " AND prescription_order.prescription_order_no = recept_collection.prescription_order_no "

			+ " AND recept_collection.specimen_no = specimen.specimen_no "

			+ " AND specimen.specimen_no = blood_collect.specimen_no "

			+ " AND blood_collect.specimen_no = recept_test.specimen_no "

			+ " AND prescription_order.prescription_code = prescription.prescription_code "
			+ " and test_prescription.prescription_code = prescription.prescription_code "
			+ "	and test_prescription.prescription_code = recept_test.prescription_code ")
	List<ReceptTestListVo> selectByReceptList();

}
