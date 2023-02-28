package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.consultation.CreateConsultationDto;
import com.kanghoshin.lis.dto.consultation.ReadFullConsultationListDto;
import com.kanghoshin.lis.vo.consultation.FullConsultationVo;
import com.kanghoshin.lis.vo.entity.ConsultationVo;

@Mapper
public interface ConsultationMapper {
	
	
	@Insert("INSERT INTO consultation(consultation_reception_no) VALUES (#{createConsultationDto.consultationReceptionNo})")
	@Options(useGeneratedKeys = true, keyProperty = "createConsultationDto.consultationNo")
	int insert(@Param("createConsultationDto")CreateConsultationDto createConsultationDto);
	
	@Select("SELECT * FROM consultation WHERE consultation_no = #{consultationNo}")
	ConsultationVo findByConsultationVo(@Param("consultationNo") int consultationNo);
	
	@Select("<script>"
			+ "SELECT * FROM full_consultation "
			+ "<where> "
			+ "<if test='readFullConsultationListDto.consultationNoKey != null'> "
			+ "consultation_no like CONCAT('%',#{readFullConsultationListDto.consultationNoKey},'%') "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationTimeStart &gt; 0'> "
			+ "AND consultation_time &gt;= #{readFullConsultationListDto.consultationTimeStart} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationTimeEnd &gt; 0'> "
			+ "AND consultation_time &lt;= #{readFullConsultationListDto.consultationTimeEnd} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationReceptionNoKey != null'> "
			+ "AND consultation_reception_no like CONCAT('%',#{readFullConsultationListDto.consultationReceptionNoKey},'%') "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationReceptionTimeStart &gt; 0'> "
			+ "AND consultation_reception_time &gt;= #{readFullConsultationListDto.consultationReceptionTimeStart} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationReceptionTimeEnd &gt; 0'> "
			+ "AND consultation_reception_time &lt;= #{readFullConsultationListDto.consultationReceptionTimeEnd} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.staffNoKey != null'> "
			+ "AND staff_no like CONCAT('%',#{readFullConsultationListDto.staffNoKey},'%') "
			+ "</if> "
			+ "<if test='readFullTestPrescriptionOrderListDto.patientNo > 0'> "
			+ "AND patient_no = #{readFullTestPrescriptionOrderListDto.patientNo} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.patientNoKey != null'> "
			+ "AND patient_no like CONCAT('%',#{readFullConsultationListDto.patientNoKey},'%') "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationReceptionAppointmentStart &gt; 0'> "
			+ "AND consultation_reception_appointment &gt;= #{readFullConsultationListDto.consultationReceptionAppointmentStart} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationReceptionAppointmentEnd &gt; 0'> "
			+ "AND consultation_reception_appointment &lt;= #{readFullConsultationListDto.consultationReceptionAppointmentEnd} "
			+ "</if> "
			+ "</where> "
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readFullConsultationListDto.consultationNoOrder != null'> "
			+ "consultation_no ${readFullConsultationListDto.consultationNoOrder} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationTimeOrder != null'> "
			+ ", consultation_time ${readFullConsultationListDto.consultationTimeOrder} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationReceptionNoOrder != null'> "
			+ ", consultation_reception_no ${readFullConsultationListDto.consultationReceptionNoOrder} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationReceptionTimeOrder != null'> "
			+ ", consultation_reception_time ${readFullConsultationListDto.consultationReceptionTimeOrder} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.staffNoOrder != null'> "
			+ ", staff_no ${readFullConsultationListDto.staffNoOrder} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.patientNoOrder != null'> "
			+ ", patient_no ${readFullConsultationListDto.patientNoOrder} "
			+ "</if> "
			+ "<if test='readFullConsultationListDto.consultationReceptionAppointmentOrder != null'> "
			+ ", consultation_reception_appointment ${readFullConsultationListDto.consultationReceptionAppointmentOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readFullConsultationListDto.pageStart}, #{readFullConsultationListDto.pageSize} "
			+ "</script>")
	FullConsultationVo[] selectFullConsultation(@Param("readFullConsultationListDto") ReadFullConsultationListDto readFullConsultationListDto );
}
