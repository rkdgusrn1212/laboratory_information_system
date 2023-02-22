package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.testfield.ReadTestFieldListDto;
import com.kanghoshin.lis.vo.entity.TestFieldVo;

@Mapper
public interface TestFieldMapper {

	@Select("<script>"
			+ "SELECT * FROM test_field "
			+ "<where> "
			+ "<if test='readTestFieldListDto.testFieldCodeKey != null'> "
			+ "test_field_code like CONCAT('%',#{readTestFieldListDto.testFieldCodeKey},'%') "
			+ "</if> "
			+ "<if test='readTestFieldListDto.testFieldNameKey != null'> "
			+ "AND test_field_name like CONCAT('%',#{readTestFieldListDto.testFieldNameKey},'%') "
			+ "</if> "
			+ "</where> "
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readTestFieldListDto.testFieldNameOrder != null'> "
			+ " test_field_name ${readTestFieldListDto.testFieldNameOrder} "
			+ "</if> "
			+ "<if test='readTestFieldListDto.testFieldCodeOrder != null'> "
			+ ", test_field_code ${readTestFieldListDto.testFieldCodeOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readTestFieldListDto.pageStart}, #{readTestFieldListDto.pageSize}"
			+ "</script>")
	TestFieldVo[] select(@Param("readTestFieldListDto") ReadTestFieldListDto readTestFieldListDto);
}
