package com.kanghoshin.lis.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.test.TestResultInputDto;
import com.kanghoshin.lis.service.TestResultInputService;
import com.kanghoshin.lis.vo.testresult.TestResultInputVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/testresult")
@RequiredArgsConstructor
public class TestResultInputController {

	private final TestResultInputService testResultInputService;

	@GetMapping("findspecimen")
	public TestResultInputVo findBySpecimenNo(@RequestParam("specimenNo") int specimenNo) {
		System.out.println(specimenNo);
		return testResultInputService.findBySpecimenNo(specimenNo);
	}

	@PostMapping("testresultinput")
	public void insert(@RequestBody TestResultInputDto testResultInputDto) {
		testResultInputService.insert(testResultInputDto);
	}
	
}
