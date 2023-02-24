package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface NurseMapper {
	
	@Update("UPDATE staff SET staff_type = 'NUR' WHERE staff_no = #{staffNo}")
	int insert(@Param("staffNo") int staffNo);
}
