package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.DepartmentMapper;
import com.kanghoshin.lis.dto.department.ReadDepartmentDto;
import com.kanghoshin.lis.vo.entity.DepartmentVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService{

	private final DepartmentMapper departmentMapper;
	
	@Override
	public DepartmentVo[] readDepartmentList(@NotNull @Valid ReadDepartmentDto readDepartmentDto) {
		return departmentMapper.select(readDepartmentDto);
	}

}
