package com.kanghoshin.lis.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.testfield.ReadTestFieldListDto;
import com.kanghoshin.lis.service.TestFieldService;
import com.kanghoshin.lis.vo.entity.TestFieldVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/test-field")//직원만 사용가능
@RequiredArgsConstructor
public class TestFieldController {

	private final TestFieldService testFieldService;
	
	@GetMapping("list")
	public TestFieldVo[] readTestFieldList(@NotNull @Valid ReadTestFieldListDto readTestFieldDto) {
		return testFieldService.readTestFieldList(readTestFieldDto);
	}
}