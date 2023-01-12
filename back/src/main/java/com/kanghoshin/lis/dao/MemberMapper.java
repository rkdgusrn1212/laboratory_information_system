package com.kanghoshin.lis.dao;

import java.util.Date;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.model.MemberVo;

@Mapper
public interface MemberMapper {

	@Select("SELECT * FROM member WHERE member_id = #{member_id}")
	MemberVo findByMemberId(@Param("member_id") String memberId);

	@Insert("INSERT INTO member VALUES("
			+ "#{member_id},"
			+ " #{member_password},"
			+ " #{member_name},"
			+ " #{member_birth},"
			+ " #{member_sex},"
			+ " #{member_phone},"
			+ " #{member_email},"
			+ " #{member_image},"
			+ " #{member_type})")
	int insert(
			@Param("member_id") String memberId,
			@Param("member_password") String memberPassword,
			@Param("member_name") String memberName,
			@Param("member_birth") Date memberBirth,
			@Param("member_sex") int memberSex,
			@Param("member_phone") String memberPhone,
			@Param("member_email") String mamberEmail,
			@Param("member_image") String memberImage,
			@Param("member_type") int memberType);

}
