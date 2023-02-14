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
import com.kanghoshin.lis.vo.collect.CollectSpecimenVo;
import com.kanghoshin.lis.vo.collect.InadequateTypeVo;
import com.kanghoshin.lis.vo.collect.SubmitInadequateVo;
import com.kanghoshin.lis.vo.entity.StaffVo;

@Mapper
public interface CollectMapper {

	@Select("SELECT staff_no as staffNo, staff_name as staffName, staff_birth as staffBirth, staff_male as staffMale,"
			+ " staff_phone as staffPhone, staff_image as staffImage, staff_rrn as staffRrn, staff_admitted as staffAdmitted,"
			+ " staff_type as staffType FROM staff")
	List<StaffVo> getallstafflistall();


	@Select("SELECT specimen_no as specimenNo ,staff_no as staffNo, DATE_FORMAT(specimen_date,'%Y-%m-%d-%H:%i:%s')AS specimenDate FROM `kanghoshin_lis`.`specimen` ORDER BY `specimen_date` DESC")
	List<CollectSpecimenVo> listspecimenall();

	@Select("SELECT  specimen_no as specimenNo, staff_no as staffNo, specimen_date as specimenDate"
			+ "FROM specimen WHERE specimen_no = #{specimenNo}")
	CollectSpecimenVo findByspecimenno(@Param("specimenNo") String specimenNo);

	@Insert("INSERT INTO specimen(staff_no,specimen_date) VALUES ( #{specimenDto.staffNo} , DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d-%H:%i:%s'))")
	@Options(useGeneratedKeys = true, keyProperty = "specimenDto.specimenNo")
	void specimeninsertbsystaffno(@Param("specimenDto") SpecimenDto specimenDto);

	@Select("SELECT Inadequate_type_code as InadequateTypeCode, Inadequate_type_name as InadequateTypeName,Inadequate_type_brief_explanation as InadequateTypeBriefExplanation FROM inadequate_type")
	List<InadequateTypeVo> listInadequate_typeall();

	@Select("SELECT blood_collect.specimen_no AS specimenNo, blood_collect.staff_no AS staffNo, blood_collect.collect_date AS collectDate, specimen.specimen_date AS specimenDate, specimen.staff_no AS printstaffNo FROM blood_collect,specimen WHERE blood_collect.specimen_no= specimen.specimen_no ORDER BY blood_collect.collect_date desc")
	List<BloodCollectVo> listcollectall();

	@Select("SELECT blood_collect.specimen_no AS specimenNo, blood_collect.staff_no AS staffNo, blood_collect.collect_date AS collectDate, specimen.specimen_date AS specimenDate, specimen.staff_no AS printstaffNo FROM blood_collect,specimen WHERE blood_collect.specimen_no= specimen.specimen_no and blood_collect.specimen_no = #{specimenNo}")
	BloodCollectVo findcollectByspecimenno(@Param("specimenNo") String specimenNo);

	@Insert("INSERT INTO blood_Collect(specimen_no, staff_no,collect_date) VALUES (#{BloodCollectDto.specimenNo} ,#{BloodCollectDto.staffNo} , DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d-%H:%i:%s'))")
	void collectinsertbydto(@Param("BloodCollectDto") BloodCollectDto BloodCollectDto);

	@Select("select submit_inadequate.specimen_no AS SpecimenNo, submit_inadequate.Inadequate_type_code AS InadequateTypeCode,inadequate_type.Inadequate_type_name AS InadequateTypeName, submit_inadequate.Submit_Inadequate_from AS SubmitInadequateFrom,  submit_inadequate.Submit_Inadequate_to AS SubmitInadequateTo, blood_collect.staff_no AS BloodCollectStaffNo, blood_collect.collect_date AS CollectDate ,submit_inadequate.recept_Inadequate_date AS ReceptInadequateDate from blood_collect, inadequate_type, submit_inadequate WHERE submit_inadequate.Inadequate_type_code= inadequate_type.Inadequate_type_code AND blood_collect.specimen_no = submit_inadequate.specimen_no ORDER BY ReceptInadequateDate desc")
	List<SubmitInadequateVo> SubmitInadequatelist();

	@Select("select submit_inadequate.specimen_no AS SpecimenNo, submit_inadequate.Inadequate_type_code AS InadequateTypeCode,inadequate_type.Inadequate_type_name AS InadequateTypeName, submit_inadequate.Submit_Inadequate_from AS SubmitInadequateFrom,  submit_inadequate.Submit_Inadequate_to AS SubmitInadequateTo, blood_collect.staff_no AS BloodCollectStaffNo, blood_collect.collect_date AS CollectDate ,submit_inadequate.recept_Inadequate_date AS ReceptInadequateDate from blood_collect, inadequate_type, submit_inadequate WHERE submit_inadequate.Inadequate_type_code= inadequate_type.Inadequate_type_code AND blood_collect.specimen_no = submit_inadequate.specimen_no and submit_inadequate.specimen_no = #{specimenNo} ")
	SubmitInadequateVo getSubmitInadequatebyno(@Param("specimenNo") String specimenNo);

	@Insert("INSERT INTO submit_inadequate (specimen_no,Inadequate_type_code,Submit_Inadequate_to,Submit_Inadequate_from,recept_Inadequate_date)VALUES(#{SubmitInadequateDto.specimenNo}, #{SubmitInadequateDto.inadequateTypeCode}, #{SubmitInadequateDto.submitInadequateTo},#{SubmitInadequateDto.submitInadequateFrom}, DATE_FORMAT(CURRENT_TIMESTAMP(),'%Y-%m-%d-%H:%i:%s'))")
	void SubmitInadequatebyDto(@Param("SubmitInadequateDto") SubmitInadequateDto SubmitInadequateDto);

}
