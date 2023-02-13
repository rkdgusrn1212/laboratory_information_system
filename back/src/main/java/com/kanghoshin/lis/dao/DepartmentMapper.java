package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.department.ReadDepartmentDto;
import com.kanghoshin.lis.vo.entity.DepartmentVo;

@Mapper
public interface DepartmentMapper {
	@Select("<script>"
			+ "SELECT department_code as departmentCode, department_name as departmentName FROM department "
			+ "<where> "
			+ "<if test='readDepartmentDto.departmentCodeKey != null'> "
			+ "department_code like CONCAT('%',#{readDepartmentDto.departmentCodeKey},'%') "
			+ "</if> "
			+ "<if test='readDepartmentDto.departmentNameKey != null'> "
			+ "AND department_name like CONCAT('%',#{readDepartmentDto.departmentNameKey},'%') "
			+ "</if> "
			+ "</where> "
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readDepartmentDto.departmentNameOrder != null'> "
			+ " department_name ${readDepartmentDto.departmentNameOrder} "
			+ "</if> "
			+ "<if test='readDepartmentDto.departmentCodeOrder != null'> "
			+ ", department_code ${readDepartmentDto.departmentCodeOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readDepartmentDto.pageStart}, #{readDepartmentDto.pageSize}"
			+ "</script>")
	DepartmentVo[] select(@Param("readDepartmentDto") ReadDepartmentDto readDepartmentDto);
}
