package com.kanghoshin.lis.dto.doctor;

import com.kanghoshin.lis.constraints.department.DepartmentCodeConstraints;
import com.kanghoshin.lis.constraints.doctor.DoctorCertificationConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateDoctorDto {
	
	@DoctorCertificationConstraints
	public int doctorCertification;

	@DepartmentCodeConstraints
	public String departmentCode;
}
