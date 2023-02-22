package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.TestFieldMapper;
import com.kanghoshin.lis.dto.testfield.ReadTestFieldListDto;
import com.kanghoshin.lis.vo.entity.TestFieldVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestFieldServiceImpl implements TestFieldService{

	private final TestFieldMapper departmentMapper;
	
	@Override
	public TestFieldVo[] readTestFieldList(@NotNull @Valid ReadTestFieldListDto readTestFieldDto) {
		return departmentMapper.select(readTestFieldDto);
	}

}
