package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.testfield.ReadTestFieldListDto;
import com.kanghoshin.lis.vo.entity.TestFieldVo;

@Validated
public interface TestFieldService {
	TestFieldVo[] readTestFieldList(@NotNull @Valid ReadTestFieldListDto departmentDto);
}
