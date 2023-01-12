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
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
public class SignUpDto {
	@NotBlank
	@Size(min = 1, max = 40)
	private String memberId;


	@NotBlank(message="비밀번호가 비어있습니다.")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&^])[A-Za-z0-9@$!%*#?&^]{9,40}$", message = 
			"영문, 숫자, 특수문자가 각각 하나이상 포함된 9자 이상 40자 이하의 문자열")
	private String memberPassword;
	
	@NotBlank(message="이름이 비어있음")
	@Size(max=40, message="이름은 40글자 이하")
	private String memberName;

	@NotNull(message="생일이 비어있음")
	private Date memberBirth;

	@Max(value=1, message="최대 1(남자)")
	@Max(value=0, message="최소 0(여자)")
	private int memberSex;

	@NotNull(message="전화번호가 비어있음")
	@Pattern(regexp ="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$", message="전화번호 양식이 안맞음")
	private String memberPhone;

	@NotNull(message="이메일이 비어있음")
	@Size(max=350, message="이메일은 최대 350자")
	@Pattern(regexp="^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$", message="이메일 양식이 안맞음")
	private String memberEmail;

	@Size(max=255, message="이미지 경로 최대 길이는 255")
	private String memberImage;

	@Max(value = 1, message="타입은 최대 1(의사)")
	@Min(value = 0, message="타입은 최소 0(간호사)")
	private int memberType;
}
