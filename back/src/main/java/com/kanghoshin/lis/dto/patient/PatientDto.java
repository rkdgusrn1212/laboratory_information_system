package com.kanghoshin.lis.dto.patient;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.NameConstraints;
import com.kanghoshin.lis.constraints.PhoneConstraints;
import com.kanghoshin.lis.constraints.RrnConstraints;
import com.kanghoshin.lis.constraints.patient.PatientAddressConstraints;

import lombok.Data;

@Data
public class PatientDto {

	private int patientNo;
	
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
	
	@NotBlank(message = "주소가 비어있습니다.")
	@PatientAddressConstraints
	private String patientAddress;
}
