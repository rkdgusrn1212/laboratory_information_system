package com.kanghoshin.lis.dao;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import com.kanghoshin.lis.dto.auth.SignUpDto;
import com.kanghoshin.lis.vo.StaffVo;

@Mapper
public interface StaffMapper {

	@Select("SELECT staff_no as no,"
			+ "staff_name as name, staff_birth as birth, staff_male as male, staff_phone as phone,"
			+ "staff_image as image, staff_rrn as rrn, staff_admitted as admitted"
			+ "staff_type as type  FROM staff WHERE staff_no = #{staff_no}")
	StaffVo findByNo(@Param("staff_no") int no);

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