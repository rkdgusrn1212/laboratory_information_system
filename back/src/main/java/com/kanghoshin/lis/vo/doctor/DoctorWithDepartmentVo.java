package com.kanghoshin.lis.vo.doctor;

import com.kanghoshin.lis.constraints.NameConstraints;
import com.kanghoshin.lis.vo.entity.DoctorVo;

import lombok.Getter;

@Getter
public class DoctorWithDepartmentVo extends DoctorVo {
	
	
	public DoctorWithDepartmentVo(int doctorCertification, String departmentCode, String departmentName) {
		super(doctorCertification, departmentCode);
		this.departmentName = departmentName;
	}

	@NameConstraints
	private final String departmentName;
}
