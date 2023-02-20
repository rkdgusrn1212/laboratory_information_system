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

	@Select("SELECT specimen.specimen_no as specimenNo, test.test_specimen as testSpecimen,"
			+ " test.test_amount as testAmount, test.test_container as testContainer,"
			+ " patient.patient_no as patientNo, patient.patient_name as patientName,"
			+ " patient.patient_male as patientMale, patient.patient_rrn as patientRrn,"
			+ " prescription.test_code as testCode, test.test_name as testName,"
			+ " staff.staff_name as nurseName, blood_collect.collect_date as collectDate,"
			+ " staff.staff_name as doctorName, prescription_order.order_date as orderDate"
			+ " FROM patient, visit, prescription_order, recept_collection, specimen,"
			+ " blood_collect, test, prescription, staff, doctor"
			+ " WHERE blood_collect.specimen_no = specimen.specimen_no "
			+ "AND specimen.specimen_no = recept_collection.specimen_no "
			+ "AND blood_collect.staff_no = staff.staff_no "
			+ "AND recept_collection.order_no = prescription_order.order_no "
			+ "AND prescription_order.visit_no = visit.visit_no " 
			+ "AND visit.patient_no = patient.patient_no "
			+ "AND staff.staff_no = doctor.staff_no " 
			+ "AND doctor.staff_no = visit.visit_doctor "
			+ "AND visit.visit_no = prescription_order.visit_no "
			+ "AND prescription_order.prescription_code = prescription.prescription_code "
			+ "AND prescription.test_code = test.test_code "
			+ "AND blood_collect.specimen_no = #{specimenNo}")
	ReceptTestSearchVo findBySpecimenNo(@Param("specimenNo") int specimenNo);

	
	@Insert("INSERT INTO recept_test "
			+ "VALUES(#{specimen_no}, #{test_code}, #{staff_no}, #{reception_date})")
	void insert(@Param("testReceptDto") TestReceptDto testReceptDto);
	
	
	@Select("SELECT recept_test.specimen_no as specimenNo, patient.patient_name as patientName,"
			+ " prescription.test_code as testCode, DATE_FORMAT(prescription_order.order_date,'%y년 %m월 %d일') as orderDate,"
			+ " DATE_FORMAT(blood_collect.collect_date,'%y년 %m월 %d일') as collectDate, DATE_FORMAT(recept_test.reception_date,'%y년 %m월 %d일') as receptionDate"
			+ " FROM patient, visit, prescription_order, prescription,"
			+ " recept_collection, specimen,blood_collect, recept_test" 
			+ " WHERE patient.patient_no = visit.patient_no "
			+ " AND visit.visit_no = prescription_order.visit_no "
			+ " AND prescription_order.order_no = recept_collection.order_no "
			+ " AND recept_collection.specimen_no = specimen.specimen_no "
			+ " AND specimen.specimen_no = blood_collect.specimen_no "
			+ " AND blood_collect.specimen_no = recept_test.specimen_no "
			+ " AND prescription_order.prescription_code = prescription.prescription_code")
	List<ReceptTestListVo> selectByReceptList();

}
