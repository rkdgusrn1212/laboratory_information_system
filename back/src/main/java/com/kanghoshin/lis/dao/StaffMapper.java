package com.kanghoshin.lis.dao;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import com.kanghoshin.lis.dto.auth.DetailsDto;
import com.kanghoshin.lis.dto.staff.ReadStaffListDto;
import com.kanghoshin.lis.vo.entity.StaffVo;

@Mapper
public interface StaffMapper {

	@Select("SELECT staff_no as staffNo,"
			+ "staff_name as staffName, staff_birth as staffBirth, staff_male as staffMale, staff_phone as staffPhone,"
			+ "staff_image as staffImage, staff_rrn as staffRrn, staff_admitted as staffAdmitted, "
			+ "staff_type as staffType FROM staff WHERE staff_no = #{staff_no}")
	StaffVo findByStaffNo(@Param("staff_no") int staffNo);

	@Insert("CALL staff_insert("
			+ " #{detailsDto.staffName},"
			+ " #{detailsDto.staffBirth},"
			+ " #{detailsDto.staffMale},"
			+ " #{detailsDto.staffPhone},"
			+ " #{detailsDto.staffImage},"
			+ " #{detailsDto.staffRrn},"
			+ " #{authId})")
	@Options(useGeneratedKeys=true,  keyProperty="detailsDto.staffNo")
	void insertDetailsDto(@Param("detailsDto") DetailsDto detailsDto, @Param("authId")String authId);
	

	@Select("<script>"
			+ "SELECT staff_no as staffNo"
			+ ", staff_name as staffName"
			+ ", staff_male as staffMale"
			+ ", staff_phone as staffPhone"
			+ ", staff_rrn as staffRrn"
			+ ", staff_birth as staffBirth"
			+ " FROM staff "
			+ "<where> "
			+ "<if test='readStaffListDto.staffAdmittedKey != null'> "
			+ "staff_admitted = #{readStaffListDto.staffAdmittedKey} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffTypeKey != null'> "
			+ "AND staff_type = #{readStaffListDto.staffTypeKey} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffNoKey != null'> "
			+ "AND staff_no like CONCAT('%',#{readStaffListDto.staffNoKey},'%') "
			+ "</if> "
			+ "<if test='readStaffListDto.staffNameKey != null'> "
			+ "AND staff_name like CONCAT('%',#{readStaffListDto.staffNameKey},'%') "
			+ "</if> "	
			+ "<if test='readStaffListDto.staffMaleKey != null'> "
			+ "AND staff_male like CONCAT('%',#{readStaffListDto.staffMaleKey},'%') "
			+ "</if> "
			+ "<if test='readStaffListDto.staffPhoneKey != null'> "
			+ "AND staff_phone like CONCAT('%',#{readStaffListDto.staffPhoneKey},'%') "
			+ "</if> "
			+ "<if test='readStaffListDto.staffRrnKey != null'> "
			+ "AND staff_rrn like CONCAT('%',#{readStaffListDto.staffRrnKey},'%') "
			+ "</if> "
			+ "<if test='readStaffListDto.staffBirthStart != null'> "
			+ "AND staff_birth &gt;= #{readStaffListDto.staffBirthStart} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffBirthEnd != null'> "
			+ "AND staff_birth &lt;= #{readStaffListDto.staffBirthEnd} "
			+ "</if> "
			+ "</where> "
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readStaffListDto.staffAdmittedOrder != null'> "
			+ " staff_admitted ${readStaffListDto.staffAdmittedOrder} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffTypeOrder != null'> "
			+ ", staff_type ${readStaffListDto.staffTypeOrder} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffMaleOrder != null'> "
			+ ", staff_male ${readStaffListDto.staffMaleOrder} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffNameOrder != null'> "
			+ ", staff_name ${readStaffListDto.staffNameOrder} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffPhoneOrder != null'> "
			+ ", staff_phone ${readStaffListDto.staffPhoneOrder} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffRrnOrder != null'> "
			+ ", staff_rrn ${readStaffListDto.staffRrnOrder} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffBirthOrder != null'> "
			+ ", staff_birth ${readStaffListDto.staffBirthOrder} "
			+ "</if> "
			+ "<if test='readStaffListDto.staffNoOrder != null'> "
			+ ", staff_no ${readStaffListDto.staffNoOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readStaffListDto.pageStart}, #{readStaffListDto.pageSize}"
			+ "</script>")
	StaffVo[] select(@Param("readStaffListDto") ReadStaffListDto readStaffListDto);
}
