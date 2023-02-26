package com.kanghoshin.lis.service;

import java.util.List;

import com.kanghoshin.lis.dto.test.TestResultAnalysisDto;
import com.kanghoshin.lis.vo.testanalysis.TestAnalysisChartVo;
import com.kanghoshin.lis.vo.testanalysis.TestAnalysisListVo;

public interface TestAnalysisService {

	List<TestAnalysisListVo> graph(TestResultAnalysisDto testResultAnalysisDto);
	
	
	List<TestAnalysisChartVo> chart(TestResultAnalysisDto testResultAnalysisDto);
}
