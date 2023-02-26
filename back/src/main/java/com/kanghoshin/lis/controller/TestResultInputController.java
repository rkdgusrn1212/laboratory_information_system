package com.kanghoshin.lis.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.test.TestResultInputDto;
import com.kanghoshin.lis.service.TestResultInputService;
import com.kanghoshin.lis.vo.testresult.TestResultInputVo;
import com.kanghoshin.lis.vo.testresult.TestResultVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/testresult")
@RequiredArgsConstructor
public class TestResultInputController {

	private final TestResultInputService testResultInputService;

	@GetMapping("findspecimen")
	public TestResultInputVo findBySpecimenNo(@RequestParam("specimenNo") int specimenNo) {
		return testResultInputService.findBySpecimenNo(specimenNo);
	}

	@PostMapping("testresultinput")
	public void insert(@Valid @RequestBody TestResultInputDto testResultInputDto) {
		System.out.println("hi");
		testResultInputService.insert(testResultInputDto);
		System.out.println("hizzzzzz");
	}
	
	@GetMapping("selectresult")
	public List<TestResultVo> selectResult() {
		return testResultInputService.selectResult();
	}
	
}
