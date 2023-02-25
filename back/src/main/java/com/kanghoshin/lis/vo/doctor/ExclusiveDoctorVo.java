package com.kanghoshin.lis.vo.doctor;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.constraints.department.DepartmentCodeConstraints;
import com.kanghoshin.lis.constraints.doctor.DoctorCertificationConstraints;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExclusiveDoctorVo{
	
	@NoConstraints
	private int staffNo;
	@DoctorCertificationConstraints
	private int doctorCertification;
	@DepartmentCodeConstraints
	private String departmentCode;
}

