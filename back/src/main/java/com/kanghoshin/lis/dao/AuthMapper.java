package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import com.kanghoshin.lis.vo.entity.AuthVo;

@Mapper
public interface AuthMapper {

	@Select("SELECT auth_id as authId, auth_password as authPassword, auth_refresh as authRefresh, staff_no as staffNo "
			+ ",validation_email as validationEmail "
			+ "FROM auth WHERE auth_id = #{auth_id}")
	AuthVo findByAuthId(@Param("auth_id") String authId);

	@Insert("INSERT INTO auth VALUES(#{auth_id}, #{auth_password}, #{auth_refresh}, null, #{validation_email})")
	int insert(@Param("auth_id") String authId,
			@Param("auth_password") String authPassword,
			@Param("auth_refresh") String authRefresh,
			@Param("validation_email") String validationEmail);
}
