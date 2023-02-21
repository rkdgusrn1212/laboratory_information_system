package com.kanghoshin.lis.vo.entity;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.kanghoshin.lis.constraints.NameConstraints;
import com.kanghoshin.lis.constraints.PhoneConstraints;
import com.kanghoshin.lis.constraints.staff.StaffTypeConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffVo {

	private int staffNo;

	@NotBlank(message="이름이 비어있음")
	@NameConstraints
	private String staffName;

	@NotNull(message="생일이 비어있음")
	private Date staffBirth;

	private boolean staffMale;

	@NotNull(message="전화번호가 비어있음")
	@PhoneConstraints
	private String staffPhone;

	@Size(max=255, message="이미지 경로 최대 길이는 255")
	private String staffImage;

	@NotNull
	@Size(min=14, max=14)
	private String staffRrn;

	private boolean staffAdmitted;

	@StaffTypeConstraints
	private String staffType;
}