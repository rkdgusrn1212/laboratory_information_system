package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.specimencontainer.ReadSpecimenContainerListDto;
import com.kanghoshin.lis.vo.entity.SpecimenContainerVo;

@Mapper
public interface SpecimenContainerMapper {
	
	@Select("SELECT * FROM specimen_container WHERE specimen_container_code = #{specimenContainerCode}")
	SpecimenContainerVo findSpecimenBySpecimenContainerCode(@Param("specimenContainerCode") String specimenContainerCode);
	
	
	@Select("<script>"
			+ "SELECT * FROM specimen_container "
			+ "<where> "
			+ "<if test ='readSpecimenContainerListDto.specimenContainerCodeKey!=null'> "
			+ "specimen_container_code like CONCAT('%',#{readSpecimenContainerListDto.specimenContainerCodeKey},'%') "
			+ "</if> "
			+ "<if test ='readSpecimenContainerListDto.specimenContainerNameKey!=null'> "
			+ "AND specimen_container_name like CONCAT('%',#{readSpecimenContainerListDto.specimenContainerNameKey},'%') "
			+ "</if> "
			+ "</where>"
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readSpecimenContainerListDto.specimenContainerCodeOrder != null'> "
			+ " specimen_container_code ${readSpecimenContainerListDto.specimenContainerCodeOrder} "
			+ "</if> "
			+ "<if test='readSpecimenContainerListDto.specimenContainerNameOrder != null'> "
			+ ", specimen_container_name ${readSpecimenContainerListDto.specimenContainerNameOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readSpecimenContainerListDto.pageStart}, #{readSpecimenContainerListDto.pageSize}"
			+ "</script>")
	SpecimenContainerVo[] select(@Param("readSpecimenContainerListDto") ReadSpecimenContainerListDto readSpecimenContainerListDto);
}
