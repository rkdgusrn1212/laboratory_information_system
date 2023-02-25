package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.department.ReadDepartmentListDto;
import com.kanghoshin.lis.vo.entity.DepartmentVo;

@Mapper
public interface DepartmentMapper {
	
	@Select("SELECT * FROM department WHERE department_code = #{departmentCode}")
	DepartmentVo findByDepartmentCode(@Param("departmentCode") String departmentCode);
	
	@Select("<script>"
			+ "SELECT department_code as departmentCode, department_name as departmentName FROM department "
			+ "<where> "
			+ "<if test='readDepartmentListDto.departmentCodeKey != null'> "
			+ "department_code like CONCAT('%',#{readDepartmentListDto.departmentCodeKey},'%') "
			+ "</if> "
			+ "<if test='readDepartmentListDto.departmentNameKey != null'> "
			+ "AND department_name like CONCAT('%',#{readDepartmentListDto.departmentNameKey},'%') "
			+ "</if> "
			+ "</where> "
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readDepartmentListDto.departmentNameOrder != null'> "
			+ " department_name ${readDepartmentListDto.departmentNameOrder} "
			+ "</if> "
			+ "<if test='readDepartmentListDto.departmentCodeOrder != null'> "
			+ ", department_code ${readDepartmentListDto.departmentCodeOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readDepartmentListDto.pageStart}, #{readDepartmentListDto.pageSize}"
			+ "</script>")
	DepartmentVo[] select(@Param("readDepartmentListDto") ReadDepartmentListDto readDepartmentListDto);
}
