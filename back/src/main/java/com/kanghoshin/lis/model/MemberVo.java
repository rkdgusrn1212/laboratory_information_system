package com.kanghoshin.lis.model;

import java.util.Date;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberVo {

	@NotBlank
	@Size(min = 1, max = 40)
	private String id;

	@Size(min=60, max=60)
	private String password;//null은 인증 불가상태

	@NotBlank(message="이름이 비어있음")
	@Size(max=40, message="이름은 40글자 이하")
	private String name;

	@NotNull(message="생일이 비어있음")
	private Date birth;

	private boolean male;

	@NotNull(message="전화번호가 비어있음")
	@Pattern(regexp ="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$", message="전화번호 양식이 안맞음")
	private String phone;

	@NotNull(message="이메일이 비어있음")
	@Size(max=350, message="이메일은 최대 350자")
	@Pattern(regexp="^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$", message="이메일 양식이 안맞음")
	private String email;

	@Size(max=255, message="이미지 경로 최대 길이는 255")
	private String image;

	@Max(value = 1, message="타입은 최대 1(의사)")
	@Min(value = 0, message="타입은 최소 0(간호사)")
	private int type;


	public String getRole(){
		if(type>0) {
			return "ROLE_DOC";
		}
		return "ROLE_NUR";
	}
}