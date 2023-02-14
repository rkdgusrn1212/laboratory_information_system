package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;

@Mapper
public interface DoctorMapper {
	
	@Insert("INSERT INTO doctor (staff_no, doctor_certification, department_code) "
			+ "VALUES (#{createDoctorDto.staffNo}, #{createDoctorDto.doctorCertification}, #{createDoctorDto.departmentCode})")
	int insert(@Param("createDoctorDto") CreateDoctorDto createDoctorDto );
}
