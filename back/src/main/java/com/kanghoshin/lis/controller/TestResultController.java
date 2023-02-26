package com.kanghoshin.lis.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.test.TestResultSearchDto;
import com.kanghoshin.lis.service.TestResultService;
import com.kanghoshin.lis.vo.testresult.TestResultListVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/result")
@RequiredArgsConstructor
public class TestResultController {

	private final TestResultService testResultService;

	@GetMapping("findresultlist")
	public List<TestResultListVo> selectByResultList() {
		return testResultService.selectByResultList();
	}

	@GetMapping("findresultlistbypatient")
	public List<TestResultListVo> selectByPatient(@Valid TestResultSearchDto testResultSearchDto) {
		return testResultService.selectByPatient(testResultSearchDto);

	}

}
