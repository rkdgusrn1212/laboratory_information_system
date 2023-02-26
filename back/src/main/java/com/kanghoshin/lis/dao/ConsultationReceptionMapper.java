package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.consultationreception.CreateConsultationAppointmentDto;
import com.kanghoshin.lis.dto.consultationreception.CreateConsultationWalkInDto;
import com.kanghoshin.lis.dto.consultationreception.ReadConsultationWalkInListDto;
import com.kanghoshin.lis.vo.consultationreception.ConsultationWalkInVo;

@Mapper
public interface ConsultationReceptionMapper {

	@Insert("INSERT INTO consultation_reception"
			+ "( staff_no, patient_no )"
			+ "VALUES (#{createConsultationWalkInDto.staffNo}, #{createConsultationWalkInDto.patientNo})")
	int insertWalkIn(@Param("createConsultationWalkInDto")CreateConsultationWalkInDto createConsultationWalkInDto);
	
	@Select("<script>"
			+ "SELECT * FROM consultation_walk_in "
			+ "<where> "
			+ "<if test='readConsultationWalkInDto.staffNo > 0'> "
			+ "staff_no = #{readConsultationWalkInDto.staffNo} "
			+ "</if> "
			+ "<if test='readConsultationWalkInDto.consultationWalkInOrderStart &gt; 0'> "
			+ "AND consultation_walk_in_order &gt;= #{readConsultationWalkInDto.consultationWalkInOrderStart} "
			+ "</if> "
			+ "<if test='readConsultationWalkInDto.consultationWalkInOrderEnd &gt; 0'> "
			+ "AND consultation_walk_in_order &lt;= #{readConsultationWalkInDto.consultationWalkInOrderEnd} "
			+ "</if> "
			+ "</where> "
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readConsultationWalkInDto.staffNoOrder != null'> "
			+ "staff_no ${readConsultationWalkInDto.staffNoOrder} "
			+ "</if> "
			+ "<if test='readConsultationWalkInDto.consultationWalkInOrderOrder != null'> "
			+ ", consultation_walk_in_order ${readConsultationWalkInDto.consultationWalkInOrderOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readConsultationWalkInDto.pageStart}, #{readConsultationWalkInDto.pageSize} "
			+ "</script>")
	ConsultationWalkInVo[] selectWalkIn(@Param("readConsultationWalkInDto") ReadConsultationWalkInListDto readConsultationWalkInDto);


	@Insert("INSERT INTO consultation_reception"
			+ "( staff_no, patient_no, consultation_reception_appointment )"
			+ "VALUES (#{createConsultationAppointmentDto.staffNo}, #{createConsultationAppointmentDto.patientNo}, #{createConsultationAppointmentDto.consultationReceptionAppointment})")
	int insertAppointment(@Param("createConsultationAppointmentDto") CreateConsultationAppointmentDto createConsultationAppointmentDto);
}
