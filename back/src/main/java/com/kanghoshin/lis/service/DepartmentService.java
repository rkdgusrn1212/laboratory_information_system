package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.constraints.department.DepartmentCodeConstraints;
import com.kanghoshin.lis.dto.department.ReadDepartmentListDto;
import com.kanghoshin.lis.vo.entity.DepartmentVo;

@Validated
public interface DepartmentService {
	DepartmentVo[] readDepartmentList(@NotNull @Valid ReadDepartmentListDto departmentDto);

	DepartmentVo readDepartment(@NotNull @DepartmentCodeConstraints String departmentCode);
}
