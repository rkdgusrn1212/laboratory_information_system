package com.kanghoshin.lis.dto.auth;


import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.RrnConstraints;
import com.kanghoshin.lis.constraints.PhoneConstraints;
import com.kanghoshin.lis.constraints.ImageConstraints;
import com.kanghoshin.lis.constraints.NameConstraints;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDetailsDto {

	private int staffNo;//자동 입력값

	@NotBlank(message="이름이 비어있습니다.")
	@NameConstraints
	private String staffName;

	@NotNull(message="생일이 비어있습니다.")
	private Date staffBirth;

	private boolean staffMale;

	@NotBlank(message="전화번호가 비어있습니다.")
	@PhoneConstraints
	private String staffPhone;

	@ImageConstraints
	private String staffImage;

	@NotBlank(message="주민번호가 비어있습니다.")
	@RrnConstraints
	private String staffRrn;
}
