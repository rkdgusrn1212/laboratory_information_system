package com.kanghoshin.lis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.patient.PatientDto;
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
			+ ", patient_address as patientAddress FROM patient "
			+ "WHERE patient_no = #{patient_no}")
	PatientVo findByPatientNo(@Param("patient_no") int patientNo);

	@Insert("INSERT INTO patient "
			+ "(patient_no, patient_name, patient_male, patient_phone, patient_rrn, patient_birth, patient_address) "
			+ "VALUES (null"
			+ ", #{patientDto.patientName}"
			+ ", #{patientDto.patientMale}"
			+ ", #{patientDto.patientPhone}"
			+ ", #{patientDto.patientRrn}"
			+ ", #{patientDto.patientBirth}"
			+ ", #{patientDto.patientAddress}) ")
	int insert(@Param("patientDto") PatientDto patientDto);


	@Select("<script>"
			+ "SELECT patient_no as patientNo"
			+ ", patient_name as patientName"
			+ ", patient_male as patientMale"
			+ ", patient_phone as patientPhone"
			+ ", patient_rrn as patientRrn"
			+ ", patient_birth as patientBirth"
			+ ", patient_address as patientAddress FROM patient "
			+ "<where>"

			+ "<if test='readPatientListDto.patientNoStart &gt; 0'>"
			+ "patient_no  &gt;= #{readPatientListDto.patientNoStart}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientNoEnd &gt; 0'>"
			+ "AND patient_no &lt;= #{readPatientListDto.patientNoEnd}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientNoKey != null'>"
			+ "AND patient_no like #{readPatientListDto.patientNoKey}"
			+ "</if>"

			+ "<if test='readPatientListDto.patientNameStart &gt; 0'>"
			+ "patient_name  &gt;= #{readPatientListDto.patientNameStart}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientNameEnd  &gt; 0'>"
			+ "AND patient_name &lt;= #{readPatientListDto.patientNameEnd}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientNameKey != null'>"
			+ "AND patient_name like #{readPatientListDto.patientNameKey}"
			+ "</if>"

			+ "<if test='readPatientListDto.patientPhoneStart  &gt; 0'>"
			+ "patient_phone &gt;=  #{readPatientListDto.patientPhoneStart}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientPhoneEnd  &gt; 0'>"
			+ "AND patient_phone&lt;=#{readPatientListDto.patientPhoneEnd}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientPhoneKey != null'>"
			+ "AND patient_phone like #{readPatientListDto.patientPhoneKey}"
			+ "</if>"
			
			+ "<if test='readPatientListDto.patientRrnStart  &gt; 0'>"
			+ "patient_rrn  &gt;=  #{readPatientListDto.patientRrnStart}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientRrnEnd  &gt; 0'>"
			+ "AND patient_rrn &lt;= #{readPatientListDto.patientRrnEnd}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientRrnKey != null'>"
			+ "AND patient_rrn like #{readPatientListDto.patientRrnKey}"
			+ "</if>"	
			
			+ "<if test='readPatientListDto.patientBirthStart  &gt; 0'>"
			+ "patient_birth  &gt;=  #{readPatientListDto.patientBirthStart}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientBirthEnd  &gt; 0'>"
			+ "AND patient_birth &lt;= #{readPatientListDto.patientBirthEnd}"
			+ "</if>"
			+ "<if test='readPatientListDto.patientBirthKey != null'>"
			+ "AND patient_birth like #{readPatientListDto.patientBirthKey}"
			+ "</if>"
			
			+ "<if test='readPatientListDto.excludePatientMale'>"
			+ "not patient_male"
			+ "</if>"
			+ "<if test='readPatientListDto.excludePatientFemale'>"
			+ "AND patient_male"
			+ "</if>"

			+ "</where>"
			+ "</script>")
	List<PatientVo> select(@Param("readPatientListDto") ReadPatientListDto readPatientListDto);

}
