package com.kanghoshin.lis.vo.entity;

import javax.validation.constraints.NotBlank;

import com.kanghoshin.lis.constraints.NameConstraints;
import com.kanghoshin.lis.constraints.department.DepartmentCodeConstraints;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DepartmentVo {
	
	@NotBlank(message = "진료과 코드가 비어있습니다.")
	@DepartmentCodeConstraints
	String departmentCode;
	
	@NotBlank(message = "진료과 이름이 비어있습니다.")
	@NameConstraints
	String departmentName;
}
