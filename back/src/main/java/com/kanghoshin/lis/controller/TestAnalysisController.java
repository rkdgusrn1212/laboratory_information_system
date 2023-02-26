package com.kanghoshin.lis.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.test.TestResultAnalysisDto;
import com.kanghoshin.lis.service.TestAnalysisService;
import com.kanghoshin.lis.vo.testanalysis.TestAnalysisChartVo;
import com.kanghoshin.lis.vo.testanalysis.TestAnalysisListVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/analysis")
@RequiredArgsConstructor
public class TestAnalysisController {
	
	private final TestAnalysisService testAnalysisService;
	
	@GetMapping("analysisgraph")
	public List<TestAnalysisListVo> graph(@Valid TestResultAnalysisDto testResultAnalysisDto) {
		return testAnalysisService.graph(testResultAnalysisDto);

	}
	
	@GetMapping("analysischart")
	public List<TestAnalysisChartVo> chart(@Valid TestResultAnalysisDto testResultAnalysisDto) {
		return testAnalysisService.chart(testResultAnalysisDto);

	}

}
