package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;
import com.kanghoshin.lis.dto.doctor.ReadDoctorListWithDepartmentDto;
import com.kanghoshin.lis.vo.doctor.DoctorWithDepartmentVo;
import com.kanghoshin.lis.vo.doctor.ExclusiveDoctorVo;

@Mapper
public interface DoctorMapper {
	
	@Insert("INSERT INTO doctor (staff_no, doctor_certification, department_code) "
			+ "VALUES (#{staffNo}, #{createDoctorDto.doctorCertification}, #{createDoctorDto.departmentCode})")
	int insert(@Param("staffNo") int staffNo, @Param("createDoctorDto") CreateDoctorDto createDoctorDto );

	@Select("<script>"
			+ "SELECT staff.staff_no AS staffNo, staff.staff_name AS staffName, "
			+ "staff.staff_birth AS staffBirth, staff.staff_male AS staffMale, "
			+ "staff.staff_phone AS staffPhone, staff.staff_image AS staffImage, "
			+ "staff.staff_rrn AS staffRrn, staff.staff_admitted AS staffAdmitted, "
			+ "staff.staff_type AS staffType, doctor.doctor_certification AS doctorCertification, "
			+ "department.department_code AS departmentCode, department.department_name AS departmentName "
			+ "FROM doctor JOIN staff ON doctor.staff_no = staff.staff_no AND staff.staff_admitted = TRUE "
			+ "<if test='readDoctorListWithDepartmentDto.staffNameKey!=null' > "
			+ "AND staff.staff_name like CONCAT('%', #{readDoctorListWithDepartmentDto.staffNameKey}, '%') "
			+ "</if> "
			+ "<if test='readDoctorListWithDepartmentDto.departmentCodeKey!=null' > "
			+ "AND doctor.department_code like CONCAT('%', #{readDoctorListWithDepartmentDto.departmentCodeKey}, '%') "
			+ "</if> "
			+ "JOIN department ON doctor.department_code = department.department_code "
			+ "<if test='readDoctorListWithDepartmentDto.departmentNameKey!=null' > "
			+ "WHERE department.department_name like CONCAT('%', #{readDoctorListWithDepartmentDto.departmentNameKey}, '%') "
			+ "</if> "
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readDoctorListWithDepartmentDto.departmentNameOrder != null'> "
			+ " departmentNameOrder ${readDoctorListWithDepartmentDto.departmentNameOrder} "
			+ "</if> "
			+ "<if test='readDoctorListWithDepartmentDto.departmentCodeOrder != null'> "
			+ ", departmentCodeOrder ${readDoctorListWithDepartmentDto.departmentCodeOrder} "
			+ "</if> "
			+ "<if test='readDoctorListWithDepartmentDto.staffNameOrder != null'> "
			+ ", staffName ${readDoctorListWithDepartmentDto.staffNameOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readDoctorListWithDepartmentDto.pageStart}, #{readDoctorListWithDepartmentDto.pageSize}"
			+ "</script>")
	DoctorWithDepartmentVo[] selectWithDepartment(@Param("readDoctorListWithDepartmentDto") ReadDoctorListWithDepartmentDto readDoctorListWithDepartmentDto);
	
	@Select("SELECT * FROM doctor WHERE staff_no = #{doctorNo}")
	ExclusiveDoctorVo findDoctorByDoctorNo(@Param("doctorNo") int doctorNo);
}
