package com.kanghoshin.lis.dto.patient;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.NameConstraints;
import com.kanghoshin.lis.constraints.PhoneConstraints;
import com.kanghoshin.lis.constraints.RrnConstraints;

import lombok.Data;

@Data
public class CreatePatientDto {

	private int patientNo;//insert 후 key갱신용
	
	@NotBlank(message="이름이 비어있습니다.")
	@NameConstraints
	private String patientName;
	
	private boolean patientMale;

	@NotBlank(message="전화번호가 비어있습니다.")
	@PhoneConstraints
	private String patientPhone;
	
	@NotNull(message="주민번호가 비어있습니다.")
	@RrnConstraints
	private String patientRrn;
	
	@NotNull(message="생일이 비어있습니다.")
	private Date patientBirth;
}
