package com.kanghoshin.lis.dao;

import java.util.Date;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import com.kanghoshin.lis.model.MemberVo;

@Mapper
public interface MemberMapper {

	@Select("SELECT member_id as id, member_password as password,"
			+ "member_name as name, member_birth as birth, member_male as male, member_phone as phone,"
			+ "member_email as email, member_image as image,"
			+ "member_type as type  FROM member WHERE member_id = #{member_id}")
	MemberVo findById(@Param("member_id") String memberId);

	@Insert("INSERT INTO member VALUES("
			+ "#{member_id},"
			+ " #{member_password},"
			+ " #{member_name},"
			+ " #{member_birth},"
			+ " #{member_male},"
			+ " #{member_phone},"
			+ " #{member_email},"
			+ " #{member_image},"
			+ " #{member_type})")
	int insert(
			@Param("member_id") String id,
			@Param("member_password") String password,
			@Param("member_name") String name,
			@Param("member_birth") Date birth,
			@Param("member_male") boolean male,
			@Param("member_phone") String phone,
			@Param("member_email") String email,
			@Param("member_image") String image,
			@Param("member_type") int type);

}
