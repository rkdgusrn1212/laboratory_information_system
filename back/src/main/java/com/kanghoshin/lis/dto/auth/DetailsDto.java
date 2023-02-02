package com.kanghoshin.lis.dto.auth;


import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.staff.StaffImageConstraints;
import com.kanghoshin.lis.constraints.staff.StaffNameConstraints;
import com.kanghoshin.lis.constraints.staff.StaffPhoneConstraints;
import com.kanghoshin.lis.constraints.staff.StaffRrnConstraints;
import com.kanghoshin.lis.constraints.staff.StaffTypeConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailsDto {

	private int staffNo;//자동 입력값

	@NotBlank(message="이름이 비어있습니다.")
	@StaffNameConstraints
	private String staffName;

	@NotNull(message="생일이 비어있습니다.")
	private Date staffBirth;

	private boolean staffMale;

	@NotBlank(message="전화번호가 비어있습니다.")
	@StaffPhoneConstraints
	private String staffPhone;

	@StaffImageConstraints
	private String staffImage;

	@NotBlank(message="주민번호가 비어있습니다.")
	@StaffRrnConstraints
	private String staffRrn;

	@StaffTypeConstraints
	private int staffType;
}
