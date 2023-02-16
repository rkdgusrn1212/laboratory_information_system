package com.kanghoshin.lis.vo.entity;

import com.kanghoshin.lis.constraints.department.DepartmentCodeConstraints;
import com.kanghoshin.lis.constraints.doctor.DoctorCertificationConstraints;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DoctorVo extends StaffVo{
	
	@DoctorCertificationConstraints
	private int doctorCertification;
	@DepartmentCodeConstraints
	private String departmentCode;
}
