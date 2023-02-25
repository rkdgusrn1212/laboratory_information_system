package com.kanghoshin.lis.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.constraints.department.DepartmentCodeConstraints;
import com.kanghoshin.lis.dto.department.ReadDepartmentListDto;
import com.kanghoshin.lis.service.DepartmentService;
import com.kanghoshin.lis.vo.entity.DepartmentVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/department")
@RequiredArgsConstructor
public class DepartmentController {
	
	private final DepartmentService departmentService;
	
	@GetMapping("list")
	public DepartmentVo[] readDepartmentList(@NotNull @Valid ReadDepartmentListDto readDepartmentDto) {
		return departmentService.readDepartmentList(readDepartmentDto);
	}
	
	@GetMapping("{departmentCode}")
	public DepartmentVo readDepartment(@DepartmentCodeConstraints @PathVariable("departmentCode") String departmentCode) {
		return departmentService.readDepartment(departmentCode);
	}
}
