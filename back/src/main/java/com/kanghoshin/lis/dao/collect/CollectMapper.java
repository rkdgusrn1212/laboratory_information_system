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
import com.kanghoshin.lis.vo.collect.CollectPrescriptionOrderVo;
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
			+"WHERE full_test_prescription_order.prescription_order_no= recept_collection.prescription_order_no "
			+"and specimen.specimen_no = recept_collection.specimen_no and specimen.specimen_no = #{specimenNo} ")
	List<CollectSpecimenVo> findByspecimenno(@Param("specimenNo") String specimenNo);

	//검체번호 생성해서 출력받기
	@Insert("INSERT INTO specimen(staff_no,specimen_date) VALUES ( #{specimenDto.staffNo} , DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d-%H:%i:%s'))")
	@Options(useGeneratedKeys = true, keyProperty = "specimenDto.specimenNo")
	void specimeninsertbsystaffno(@Param("specimenDto") SpecimenDto specimenDto);

	
	//검체번호 입력해서 입력
	@Insert("INSERT INTO specimen(specimen_no,staff_no,specimen_date) VALUES ( #{specimenDto.specimen_no}, #{specimenDto.staffNo} , DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d-%H:%i:%s'))")
	void specimeninsertbsystaffnoandget(@Param("specimenDto") SpecimenDto specimenDto);
	
	
	//교체필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	@Insert("INSERT INTO recept_collection (specimen_no,prescription_order_no) VALUES (#{SpecimenDto.specimenNo},#{SpecimenDto.orderNo})")
	void insertReceptCollection(@Param("SpecimenDto") SpecimenDto SpecimenDto);
	
	
	
	//교체 햐야함
	@Select("SELECT prescription_order_no AS orderNo,specimen_no AS specimenNo FROM recept_collection WHERE prescription_order_no = #{orderNo} order by specimen_no desc")
	List<ReceptCollectionVo> findReceptCollectionbyorderno(@Param("orderNo") String orderNo);
	
	
	
	//채혈만생성
	@Insert("INSERT INTO blood_collect(specimen_no, staff_no,collect_date) VALUES (#{BloodCollectDto.specimenNo} ,#{BloodCollectDto.staffNo} , DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d-%H:%i:%s'))")
	void collectinsertbydto(@Param("BloodCollectDto") BloodCollectDto BloodCollectDto);

	
	
	
	
	
	@Select("SELECT Inadequate_type_code as InadequateTypeCode, Inadequate_type_name as InadequateTypeName,Inadequate_type_brief_explanation as InadequateTypeBriefExplanation FROM inadequate_type")
	List<InadequateTypeVo> listInadequate_typeall();

	//채혈페이지 목록
	@Select("SELECT blood_collect.specimen_no AS specimenNo, blood_collect.staff_no AS staffNo, blood_collect.collect_date AS collectDate, "
			+"specimen.specimen_date AS specimenDate, specimen.staff_no AS printstaffNo, recept_collection.prescription_order_no AS orderNo ,"
			+"full_test_prescription_order.specimen_container_code AS specimenContainerCode, full_test_prescription_order.specimen_type_code AS specimenTypeCode, "
			+"full_test_prescription_order.prescription_name AS prescriptionName, "
			+"full_test_prescription_order.patient_no AS patientNo "
			+"FROM blood_collect,specimen,recept_collection,full_test_prescription_order "
			+"WHERE recept_collection.prescription_order_no= full_test_prescription_order.prescription_order_no "
			+"and specimen.specimen_no=recept_collection.specimen_no "
			+"and blood_collect.specimen_no= specimen.specimen_no "
			+"ORDER BY blood_collect.collect_date desc,blood_collect.specimen_no desc ")
	List<BloodCollectVo> listcollectall();

	//채혈 다이얼로그에서 사용
	@Select("SELECT blood_collect.specimen_no AS specimenNo, blood_collect.staff_no AS staffNo, blood_collect.collect_date AS collectDate, "
			+"specimen.specimen_date AS specimenDate, specimen.staff_no AS printstaffNo , recept_collection.prescription_order_no AS orderNo, "
			+"full_test_prescription_order.specimen_container_code AS specimenContainerCode,full_test_prescription_order.specimen_type_code AS specimenTypeCode," 
			+"full_test_prescription_order.prescription_name AS prescriptionName,full_test_prescription_order.patient_no AS patientNo, "
			+"patient.patient_name AS patientName, patient.patient_male AS patientMale, patient.patient_rrn AS patientRrn "  
			+"FROM blood_collect,specimen,recept_collection,full_test_prescription_order,patient "
			+"WHERE full_test_prescription_order.patient_no= patient.patient_no "
			+"and recept_collection.prescription_order_no= full_test_prescription_order.prescription_order_no "
			+"and specimen.specimen_no=recept_collection.specimen_no "
			+"and blood_collect.specimen_no= specimen.specimen_no and blood_collect.specimen_no = #{specimenNo} "
			+"ORDER BY blood_collect.collect_date desc,blood_collect.specimen_no desc ")
	List<BloodCollectVo> findcollectByspecimenno(@Param("specimenNo") String specimenNo);


	
	//부적합검체 리스트
	@Select("select submit_inadequate.specimen_no AS SpecimenNo, submit_inadequate.Inadequate_type_code AS InadequateTypeCode, "
			+"inadequate_type.Inadequate_type_name AS InadequateTypeName, "
			+"submit_inadequate.Submit_Inadequate_from AS SubmitInadequateFrom, "
			+"submit_inadequate.Submit_Inadequate_to AS SubmitInadequateTo, blood_collect.staff_no AS BloodCollectStaffNo, "
			+"blood_collect.collect_date AS CollectDate ,submit_inadequate.recept_Inadequate_date AS ReceptInadequateDate "
			+"from blood_collect, inadequate_type, submit_inadequate "
			+"WHERE submit_inadequate.Inadequate_type_code= inadequate_type.Inadequate_type_code "
			+"AND blood_collect.specimen_no = submit_inadequate.specimen_no "
			+"ORDER BY ReceptInadequateDate DESC ")
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
	List<CollectPrescriptionOrderVo> findVisitByPatientNo(@Param("patientNo") String patientNo);
	

	//내원 정보 불러오기
	@Select(
			"SELECT consultation.consultation_no AS consultationNo ,consultation.consultation_time AS consultationTime, "
			+"department.department_name AS departmentName,staff.staff_name AS visitDoctor "
			+"FROM consultation, consultation_reception, patient ,doctor,department,staff "
			+"WHERE doctor.staff_no=staff.staff_no "
			+"and department.department_code= doctor.department_code "
			+"and consultation_reception.staff_no= doctor.staff_no "
			+"AND consultation.consultation_reception_no = consultation_reception.consultation_reception_no "
			+"AND patient.patient_no= consultation_reception.patient_no "
			+"AND patient.patient_no = #{patientNo} "
			+"ORDER BY consultation.consultation_time desc ")
	List<CollectPrescriptionVo> findconsultationPatientNo(@Param("patientNo")String patientNo);
	
	//오더 번호로 처방 정보 불러오기
	@Select("SELECT consultation.consultation_no AS consultationNo,prescription_order.prescription_order_no AS orderNo, "
			+"department.department_name AS departmentName,staff.staff_name AS visitDoctor,prescription.prescription_code AS prescriptionCode, "
			+"prescription.prescription_name AS prescriptionName, "
			+"test_prescription.specimen_type_code AS specimenTypeCode,specimen_type.specimen_type_name AS specimenTypeName "
			+"FROM prescription_order, consultation, consultation_reception, patient, doctor,department,staff,prescription,test_prescription,specimen_type "
			+"WHERE test_prescription.specimen_type_code= specimen_type.specimen_type_code "
			+"and prescription.prescription_code= prescription_order.prescription_code=test_prescription.prescription_code "
			+"and doctor.staff_no= staff.staff_no "
			+"and department.department_code= doctor.department_code "
			+"and consultation_reception.staff_no= doctor.staff_no "
			+"and prescription_order.consultation_no = consultation.consultation_no "
			+"AND consultation.consultation_reception_no = consultation_reception.consultation_reception_no "
			+"AND patient.patient_no = consultation_reception.patient_no "
			+"AND prescription_order.prescription_order_no= #{orderNo} "
	)
	List<CollectPrescriptionVo> findPrebyOrderNo(@Param("orderNo")String orderNo); 
}
