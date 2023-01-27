package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.kanghoshin.lis.vo.entity.ValidationVo;

@Mapper
public interface ValidationMapper {
	@Select("SELECT validation_email as email, validation_code as code, auth_id as authId "
			+ "FROM validation WHERE validation_email = #{validation_email}")
	ValidationVo findByEmail(@Param("validation_email") String email);
	
	@Insert("INSERT INTO validation VALUES(#{validation_email}, #{validation_code}, null)")
	int insert(@Param("validation_email") String email, @Param("validation_code") String code);
	
	@Update("UPDATE validation SET validation_code = #{validation_code} WHERE validation_email = #{validation_email}")
	int updateCode(@Param("validation_email") String email, @Param("validation_code") String code);
	
	@Update("UPDATE validation SET validation_code = null, auth_id = #{auth_id} WHERE validation_email = #{validation_email}")
	int attachAuth(@Param("validation_email") String email, @Param("auth_id") String authId);
}
