package com.kanghoshin.lis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.patient.CreatePatientDto;
import com.kanghoshin.lis.dto.patient.ReadPatientListDto;
import com.kanghoshin.lis.vo.entity.PatientVo;

@Mapper
public interface PatientMapper {

	@Select("SELECT patient_no as patientNo"
			+ ", patient_name as patientName"
			+ ", patient_male as patientMale"
			+ ", patient_phone as patientPhone"
			+ ", patient_rrn as patientRrn"
			+ ", patient_birth as patientBirth"
			+ " FROM patient WHERE patient_no = #{patient_no}")
	PatientVo findByPatientNo(@Param("patient_no") int patientNo);
	
	@Select("SELECT * FROM patient WHERE patient_rrn = #{patientRrn}")
	PatientVo findByPatientRrn(@Param("patientRrn") String patientRrn);

	@Insert("INSERT INTO patient "
			+ "(patient_no, patient_name, patient_male, patient_phone, patient_rrn, patient_birth) "
			+ "VALUES (null"
			+ ", #{createPatientDto.patientName}"
			+ ", #{createPatientDto.patientMale}"
			+ ", #{createPatientDto.patientPhone}"
			+ ", #{createPatientDto.patientRrn}"
			+ ", #{createPatientDto.patientBirth})")
	@Options(useGeneratedKeys=true,  keyProperty="createPatientDto.patientNo")
	int insert(@Param("createPatientDto") CreatePatientDto createPatientDto);


	@Select("<script>"
			+ "SELECT patient_no as patientNo"
			+ ", patient_name as patientName"
			+ ", patient_male as patientMale"
			+ ", patient_phone as patientPhone"
			+ ", patient_rrn as patientRrn"
			+ ", patient_birth as patientBirth"
			+ " FROM patient "
			+ "<where> "
			+ "<if test='readPatientListDto.patientNoKey != null'> "
			+ "CAST(patient_no as CHAR) like CONCAT('%',#{readPatientListDto.patientNoKey},'%') "
			+ "</if> "
			+ "<if test='readPatientListDto.patientNameKey != null'> "
			+ "AND patient_name like CONCAT('%',#{readPatientListDto.patientNameKey},'%') "
			+ "</if> "	
			+ "<if test='readPatientListDto.patientMaleKey != null'> "
			+ "AND patient_male = #{readPatientListDto.patientMaleKey} "
			+ "</if> "
			+ "<if test='readPatientListDto.patientPhoneKey != null'> "
			+ "AND patient_phone like CONCAT('%',#{readPatientListDto.patientPhoneKey},'%') "
			+ "</if> "
			+ "<if test='readPatientListDto.patientRrnKey != null'> "
			+ "AND patient_rrn like CONCAT('%',#{readPatientListDto.patientRrnKey},'%') "
			+ "</if> "
			+ "<if test='readPatientListDto.patientBirthStart != null'> "
			+ "AND patient_birth &gt;= #{readPatientListDto.patientBirthStart} "
			+ "</if> "
			+ "<if test='readPatientListDto.patientBirthEnd != null'> "
			+ "AND patient_birth &lt;= #{readPatientListDto.patientBirthEnd} "
			+ "</if> "
			+ "</where> "
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readPatientListDto.patientMaleOrder != null'> "
			+ " patient_male ${readPatientListDto.patientMaleOrder} "
			+ "</if> "
			+ "<if test='readPatientListDto.patientNameOrder != null'> "
			+ ", patient_name ${readPatientListDto.patientNameOrder} "
			+ "</if> "
			+ "<if test='readPatientListDto.patientPhoneOrder != null'> "
			+ ", patient_phone ${readPatientListDto.patientPhoneOrder} "
			+ "</if> "
			+ "<if test='readPatientListDto.patientRrnOrder != null'> "
			+ ", patient_rrn ${readPatientListDto.patientRrnOrder} "
			+ "</if> "
			+ "<if test='readPatientListDto.patientBirthOrder != null'> "
			+ ", patient_birth ${readPatientListDto.patientBirthOrder} "
			+ "</if> "
			+ "<if test='readPatientListDto.patientNoOrder != null'> "
			+ ", patient_no ${readPatientListDto.patientNoOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readPatientListDto.pageStart}, #{readPatientListDto.pageSize}"
			+ "</script>")
	List<PatientVo> select(@Param("readPatientListDto") ReadPatientListDto readPatientListDto);
	
	
}
