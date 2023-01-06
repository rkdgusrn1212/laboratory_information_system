package com.kanghoshin.lis.dao;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.model.AuthVo;

@Mapper
public interface AuthMapper {
	@Select("SELECT * FROM AUTH WHERE ID = #{id}")
	AuthVo findById(@Param("id") String id);
	@Insert("INSERT INTO AUTH VALUES(#{id}, #{pwd}, #{role})")
	int insert(@Param("id") String id, @Param("pwd") String pwd, @Param("role") String role);
}
