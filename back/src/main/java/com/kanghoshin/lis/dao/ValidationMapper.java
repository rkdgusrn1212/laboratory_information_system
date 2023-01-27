package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.kanghoshin.lis.vo.entity.ValidationVo;

@Mapper
public interface ValidationMapper {
	@Select("SELECT validation_email as validationEmail, validation_code as validationCode "
			+ "FROM validation WHERE validation_email = #{validation_email}")
	ValidationVo findByValidationEmail(@Param("validation_email") String email);
	
	@Insert("INSERT INTO validation VALUES(#{validation_email}, #{validation_code})")
	int insert(@Param("validation_email") String email, @Param("validation_code") String code);
	
	@Update("UPDATE validation SET validation_code = #{validation_code} WHERE validation_email = #{validation_email}")
	int updateCode(@Param("validation_email") String email, @Param("validation_code") String code);
}
