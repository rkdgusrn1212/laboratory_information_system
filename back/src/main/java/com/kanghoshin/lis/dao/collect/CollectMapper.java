package com.kanghoshin.lis.dao.collect;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.collect.BloodCollectDto;
import com.kanghoshin.lis.dto.collect.SpecimenDto;
import com.kanghoshin.lis.dto.collect.SubmitInadequateDto;
import com.kanghoshin.lis.vo.collect.BloodCollectVo;
import com.kanghoshin.lis.vo.collect.CollectPrescriptionVo;
import com.kanghoshin.lis.vo.collect.CollectSpecimenVo;
import com.kanghoshin.lis.vo.collect.CollectVisitVo;
import com.kanghoshin.lis.vo.collect.InadequateTypeVo;
import com.kanghoshin.lis.vo.collect.ReceptCollectionVo;
import com.kanghoshin.lis.vo.collect.SubmitInadequateVo;
import com.kanghoshin.lis.vo.entity.StaffVo;

@Mapper
public interface CollectMapper {

	@Select("SELECT staff_no as staffNo, staff_name as staffName, staff_birth as staffBirth, staff_male as staffMale,"
			+ " staff_phone as staffPhone, staff_image as staffImage, staff_rrn as staffRrn, staff_admitted as staffAdmitted,"
			+ " staff_type as staffType FROM staff")
	List<StaffVo> getallstafflistall();


	@Select("SELECT specimen_no as specimenNo ,staff_no as printstaffNo, DATE_FORMAT(specimen_date,'%Y-%m-%d-%H:%i:%s')AS specimenDate FROM `kanghoshin_lis`.`specimen` ORDER BY `specimen_date` DESC")
	List<CollectSpecimenVo> listspecimenall();

	//채혈페이지 검색값
	@Select("SELECT specimen.specimen_no as specimenNo, specimen.staff_no as printstaffNo, "
			+"DATE_FORMAT(specimen.specimen_date,'%Y-%m-%d-%H:%i:%s')AS specimenDate, "
			+"full_test_prescription_order.specimen_container_code as specimenContainerCode, "
			+"full_test_prescription_order.prescription_order_no AS prescriptionOrderNo, "
			+"full_test_prescription_order.specimen_type_code AS specimenTypeCode, "
			+"full_test_prescription_order.prescription_name AS prescriptionName, "
			+"full_test_prescription_order.patient_no AS patientNo, "
			+"full_test_prescription_order.prescription_order_no AS orderNo "
			+"FROM specimen, recept_collection ,full_test_prescription_order "
			+"WHERE full_test_prescription_order.prescription_order_no= recept_collection.order_no "
			+"and specimen.specimen_no = recept_collection.specimen_no and specimen.specimen_no = #{specimenNo} ")
	CollectSpecimenVo findByspecimenno(@Param("specimenNo") String specimenNo);

	@Insert("INSERT INTO specimen(staff_no,specimen_date) VALUES ( #{specimenDto.staffNo} , DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d-%H:%i:%s'))")
	@Options(useGeneratedKeys = true, keyProperty = "specimenDto.specimenNo")
	void specimeninsertbsystaffno(@Param("specimenDto") SpecimenDto specimenDto);

	@Select("SELECT Inadequate_type_code as InadequateTypeCode, Inadequate_type_name as InadequateTypeName,Inadequate_type_brief_explanation as InadequateTypeBriefExplanation FROM inadequate_type")
	List<InadequateTypeVo> listInadequate_typeall();

	//채혈페이지 목록
	@Select("SELECT blood_collect.specimen_no AS specimenNo, blood_collect.staff_no AS staffNo, blood_collect.collect_date AS collectDate, "
			+"specimen.specimen_date AS specimenDate, specimen.staff_no AS printstaffNo, recept_collection.order_no AS orderNo ,"
			+"full_test_prescription_order.specimen_container_code AS specimenContainerCode, full_test_prescription_order.specimen_type_code AS specimenTypeCode, "
			+"full_test_prescription_order.prescription_name AS prescriptionName, "
			+"full_test_prescription_order.patient_no AS patientNo "
			+"FROM blood_collect,specimen,recept_collection,full_test_prescription_order "
			+"WHERE recept_collection.order_no= full_test_prescription_order.prescription_order_no "
			+"and specimen.specimen_no=recept_collection.specimen_no "
			+"and blood_collect.specimen_no= specimen.specimen_no "
			+"ORDER BY blood_collect.collect_date desc,blood_collect.specimen_no desc ")
	List<BloodCollectVo> listcollectall();

	//채혈 다이얼로그에서 사용
	@Select("SELECT blood_collect.specimen_no AS specimenNo, blood_collect.staff_no AS staffNo, blood_collect.collect_date AS collectDate, "
			+"specimen.specimen_date AS specimenDate, specimen.staff_no AS printstaffNo , recept_collection.order_no AS orderNo, "
			+"full_test_prescription_order.specimen_container_code AS specimenContainerCode,full_test_prescription_order.specimen_type_code AS specimenTypeCode," 
			+"full_test_prescription_order.prescription_name AS prescriptionName,full_test_prescription_order.patient_no AS patientNo, "
			+"patient.patient_name AS patientName, patient.patient_male AS patientMale, patient.patient_rrn AS patientRrn "  
			+"FROM blood_collect,specimen,recept_collection,full_test_prescription_order,patient "
			+"WHERE full_test_prescription_order.patient_no= patient.patient_no "
			+"and recept_collection.order_no= full_test_prescription_order.prescription_order_no "
			+"and specimen.specimen_no=recept_collection.specimen_no "
			+"and blood_collect.specimen_no= specimen.specimen_no and blood_collect.specimen_no = #{specimenNo} "
			+"ORDER BY blood_collect.collect_date desc,blood_collect.specimen_no desc ")
	BloodCollectVo findcollectByspecimenno(@Param("specimenNo") String specimenNo);

	@Insert("INSERT INTO blood_Collect(specimen_no, staff_no,collect_date) VALUES (#{BloodCollectDto.specimenNo} ,#{BloodCollectDto.staffNo} , DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d-%H:%i:%s'))")
	void collectinsertbydto(@Param("BloodCollectDto") BloodCollectDto BloodCollectDto);

	
	//부적합검체 리스트
	@Select("select submit_inadequate.specimen_no AS SpecimenNo, submit_inadequate.Inadequate_type_code AS InadequateTypeCode, "
			+"inadequate_type.Inadequate_type_name AS InadequateTypeName, "
			+"submit_inadequate.Submit_Inadequate_from AS SubmitInadequateFrom, "
			+"submit_inadequate.Submit_Inadequate_to AS SubmitInadequateTo, blood_collect.staff_no AS BloodCollectStaffNo, "
			+"blood_collect.collect_date AS CollectDate ,submit_inadequate.recept_Inadequate_date AS ReceptInadequateDate, "
			+"full_test_prescription_order.prescription_order_no AS prescriptionrderNo , "
			+"full_test_prescription_order.specimen_container_code AS specimenContainerCode, "
			+"full_test_prescription_order.specimen_type_code AS specimenTypeCode,full_test_prescription_order.patient_no AS patientNo , "
			+"full_test_prescription_order.prescription_name AS prescriptionName "
			+"from blood_collect, inadequate_type, submit_inadequate , recept_collection,full_test_prescription_order "
			+"WHERE full_test_prescription_order.prescription_order_no=recept_collection.order_no "
			+"AND recept_collection.specimen_no= blood_collect.specimen_no "
			+"and submit_inadequate.Inadequate_type_code= inadequate_type.Inadequate_type_code "
			+"AND blood_collect.specimen_no = submit_inadequate.specimen_no "
			+"ORDER BY ReceptInadequateDate desc " )
	List<SubmitInadequateVo> SubmitInadequatelist();

	
	@Select("select submit_inadequate.specimen_no AS SpecimenNo, submit_inadequate.Inadequate_type_code AS InadequateTypeCode, "
			+ "inadequate_type.Inadequate_type_name AS InadequateTypeName, submit_inadequate.Submit_Inadequate_from AS SubmitInadequateFrom, "
			+ "submit_inadequate.Submit_Inadequate_to AS SubmitInadequateTo, blood_collect.staff_no AS BloodCollectStaffNo, "
			+ "blood_collect.collect_date AS CollectDate ,submit_inadequate.recept_Inadequate_date AS ReceptInadequateDate "
			+ "from blood_collect, inadequate_type, submit_inadequate "
			+ "WHERE submit_inadequate.Inadequate_type_code= inadequate_type.Inadequate_type_code "
			+ "AND blood_collect.specimen_no = submit_inadequate.specimen_no "
			+ "and submit_inadequate.specimen_no = #{specimenNo} ")
	SubmitInadequateVo getSubmitInadequatebyno(@Param("specimenNo") String specimenNo);

	@Insert("INSERT INTO submit_inadequate (specimen_no,Inadequate_type_code,Submit_Inadequate_to,Submit_Inadequate_from,recept_Inadequate_date) "
			+ "VALUES(#{SubmitInadequateDto.specimenNo}, #{SubmitInadequateDto.inadequateTypeCode}, #{SubmitInadequateDto.submitInadequateTo}, "
			+ "#{SubmitInadequateDto.submitInadequateFrom}, DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d-%H:%i:%s'))")
	void SubmitInadequatebyDto(@Param("SubmitInadequateDto") SubmitInadequateDto SubmitInadequateDto);

	@Select("SELECT visit.visit_no AS visitNo,visit.patient_no AS patientNo, visit.visit_date AS visitDate,"
			+"staff.staff_name AS visitDoctor,department.department_name as departmentName "
			+"FROM patient, visit, doctor, staff, department "
			+"WHERE doctor.department_code = department.department_code "
			+"and doctor.staff_no = staff.staff_no AND staff.staff_no = visit.visit_doctor "
			+"and patient.patient_no = visit.patient_no AND patient.patient_no = #{patientNo} order BY visit.visit_no desc")
	List<CollectVisitVo> findVisitByPatientNo(@Param("patientNo") String patientNo);
	
	
	//교체필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	@Insert("INSERT INTO recept_collection (specimen_no,order_no) VALUES (#{SpecimenDto.specimenNo},#{SpecimenDto.orderNo})")
	void insertReceptCollection(@Param("SpecimenDto") SpecimenDto SpecimenDto);
	
	
	
	//교체 햐야함
	@Select("SELECT order_no AS orderNo,specimen_no AS specimenNo FROM recept_collection WHERE order_no = #{orderNo} order by specimen_no desc")
	List<ReceptCollectionVo> findReceptCollectionbyorderno(@Param("orderNo") String orderNo);
	
	
	@Select("SELECT prescription.prescription_code AS prescriptionCode,visit.visit_no AS visitNo, "
					+"order1.order_no AS orderNo,order1.order_date AS orderDate, "
					+"diagnostic_test.diagnostic_test_container AS testContainer,diagnostic_test.diagnostic_test_name AS testName, "
					+"staff.staff_name AS visitDoctor,department.department_name AS departmentName,test_field.test_field_name as fieldName "
					+"FROM patient ,visit, order1,prescription,diagnostic_test,doctor,staff,department,test_field "
					+"WHERE test_field.test_field_no=diagnostic_test.field_no "
					+"and department.department_code= doctor.department_code "
					+"and doctor.staff_no = staff.staff_no and doctor.staff_no= visit.visit_doctor "
					+"and diagnostic_test.diagnostic_test_code = prescription.diagnostic_test_code "
					+"and prescription.prescription_code =order1.prescription_code and order1.visit_no= visit.visit_no "
					+"AND visit.patient_no = patient.patient_no and patient.patient_no= #{patientNo} order by visit.visit_no desc ")
	List<CollectPrescriptionVo> findPrebyPatientNo(@Param("patientNo")String patientNo);
	
	//
	@Select(
			"SELECT order1.order_no AS orderNo,recept_collection.specimen_no as specimenNo ,specimen.staff_no AS printstaffNo,specimen.specimen_date AS specimenDate, "
			+"staff.staff_name AS visitDoctor,department.department_name as departmentName,prescription.prescription_code AS prescriptionCode, "
			+"patient.patient_name AS patientName,patient.patient_no AS patientNo ,diagnostic_test.diagnostic_test_name AS testName, "
			+"diagnostic_test.diagnostic_test_container AS testContainer ,test_field.test_field_name AS fieldName, visit.visit_no as visitNo, " 
			+"order1.order_date AS orderDate "
			+"FROM order1,recept_collection,specimen,visit,doctor,staff,department,prescription,patient,diagnostic_test,test_field "
			+"WHERE test_field.test_field_no=diagnostic_test.field_no "
			+"and visit.patient_no= patient.patient_no AND diagnostic_test.diagnostic_test_code = prescription.diagnostic_test_code "
			+"and prescription.prescription_code = order1.prescription_code and doctor.department_code= department.department_code "  
			+"and doctor.staff_no = staff.staff_no and doctor.staff_no =visit.visit_doctor "
			+"and visit.visit_no= order1.visit_no and specimen.specimen_no= recept_collection.specimen_no "
			+"and recept_collection.order_no= order1.order_no and order1.order_no = #{orderNo} ")
	List<CollectPrescriptionVo> findPrebyOrderNo(@Param("orderNo")String orderNo); 
}
