package com.kanghoshin.lis.vo.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffVo {

	private int staffNo;

	@NotBlank(message="이름이 비어있음")
	@Size(max=40, message="이름은 40글자 이하")
	private String staffName;

	@NotNull(message="생일이 비어있음")
	private Date staffBirth;

	private boolean staffMale;

	@NotNull(message="전화번호가 비어있음")
	@Pattern(regexp ="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$", message="전화번호 양식이 안맞음")
	private String staffPhone;

	@Size(max=255, message="이미지 경로 최대 길이는 255")
	private String staffImage;

	@NotNull
	@Size(min=14, max=14)
	private String staffRrn;

	private boolean staffAdmitted;

	@Max(value = 1, message="타입은 최대 1(의사)")
	@Min(value = 0, message="타입은 최소 0(간호사)")
	private int staffType;


	public Collection<GrantedAuthority> getRole(){
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

		if(staffAdmitted) {
			authorities.add(()->{return "ROLE_STAFF";});
			if(staffType==1) {
				authorities.add(()->{return "ROLE_DOCTOR";});
			}
		}
		return authorities;
	}
}