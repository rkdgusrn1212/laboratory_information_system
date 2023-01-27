package com.kanghoshin.lis.dao;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import com.kanghoshin.lis.dto.auth.SignUpDto;
import com.kanghoshin.lis.vo.entity.StaffVo;

@Mapper
public interface StaffMapper {

	@Select("SELECT staff_no as staffNo,"
			+ "staff_name as staffName, staff_birth as staffBirth, staff_male as staffMale, staff_phone as staffPhone,"
			+ "staff_image as staffImage, staff_rrn as staffRrn, staff_admitted as staffAdmitted, "
			+ "staff_type as staffType FROM staff WHERE staff_no = #{staff_no}")
	StaffVo findByStaffNo(@Param("staff_no") int staffNo);

	@Insert("INSERT INTO staff(staff_name, "
			+ "staff_birth, staff_male, "
			+ "staff_phone, staff_image, "
			+ "staff_rrn, staff_type) VALUES("
			+ " #{signUpDto.staffName},"
			+ " #{signUpDto.staffBirth},"
			+ " #{signUpDto.staffMale},"
			+ " #{signUpDto.staffPhone},"
			+ " #{signUpDto.staffImage},"
			+ " #{signUpDto.staffRrn},"
			+ " #{signUpDto.staffType})")
	@Options(useGeneratedKeys=true,  keyProperty="signUpDto.staffNo")
	int insertBySignUpDto(@Param("signUpDto") SignUpDto signUpDto);
}
