package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.vo.entity.AuthVo;

@Mapper
public interface AuthMapper {

	@Select("SELECT auth_id as id, auth_password as password, auth_refresh as refresh, staff_no as staffNo "
			+ "FROM auth WHRER auth_id = #{auth_id}")
	AuthVo findById(@Param("auth_id") String id);

	@Insert("INSERT INTO auth VALUES(#{auth_id}, #{auth_password}, #{auth_refresh}, null)")
	int insert(@Param("auth_id") String id,
			@Param("auth_password") String password,
			@Param("auth_refresh") String refresh);
}
