package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.specimentype.ReadSpecimenTypeListDto;
import com.kanghoshin.lis.vo.entity.SpecimenTypeVo;

@Mapper
public interface SpecimenTypeMapper {
	
	@Select("SELECT * FROM specimen_type WHERE specimen_type_code = #{specimenTypeCode}")
	SpecimenTypeVo findSpecimenBySpecimenTypeCode(@Param("specimenTypeCode") String specimenTypeCode);
	
	
	@Select("<script>"
			+ "SELECT * FROM specimen_type "
			+ "<where> "
			+ "<if test ='readSpecimenTypeListDto.specimenTypeCodeKey!=null'> "
			+ "specimen_type_code like CONCAT('%',#{readSpecimenTypeListDto.specimenTypeCodeKey},'%') "
			+ "</if> "
			+ "<if test ='readSpecimenTypeListDto.specimenTypeNameKey!=null'> "
			+ "AND specimen_type_name like CONCAT('%',#{readSpecimenTypeListDto.specimenTypeNameKey},'%') "
			+ "</if> "
			+ "</where>"
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readSpecimenTypeListDto.specimenTypeCodeOrder != null'> "
			+ " specimen_type_code ${readSpecimenTypeListDto.specimenTypeCodeOrder} "
			+ "</if> "
			+ "<if test='readSpecimenTypeListDto.specimenTypeNameOrder != null'> "
			+ ", specimen_type_name ${readSpecimenTypeListDto.specimenTypeNameOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readSpecimenTypeListDto.pageStart}, #{readSpecimenTypeListDto.pageSize}"
			+ "</script>")
	SpecimenTypeVo[] select(@Param("readSpecimenTypeListDto") ReadSpecimenTypeListDto readSpecimenTypeListDto);
}
