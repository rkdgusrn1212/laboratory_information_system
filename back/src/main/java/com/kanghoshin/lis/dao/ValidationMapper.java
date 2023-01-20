package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.kanghoshin.lis.vo.ValidationVo;

@Mapper
public interface ValidationMapper {
	@Select("SELECT validation_email as email, validation_code as code, validation_success as success, auth_id as authId "
			+ "FROM validation WHERE validation_email = #{validation_email}")
	ValidationVo findByEmail(@Param("validation_email") String email);
	
	@Insert("INSERT INTO validation(validation_email, validation_code, auth_id) VALUES(#{validation_email}, #{validation_code}, #{auth_id})")
	int insert(@Param("validation_email") String email, @Param("validation_code") String code, @Param("auth_id") String authId);
	
	@Update("UPDATE validation SET validation_code = #{validation_code} WHERE validation_email = #{validation_email}")
	int updateCode(@Param("validation_email") String email, @Param("validation_code") String code);
}
