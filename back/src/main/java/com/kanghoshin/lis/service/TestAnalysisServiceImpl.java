package com.kanghoshin.lis.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.ResultAnalysisMapper;
import com.kanghoshin.lis.dto.test.TestResultAnalysisDto;
import com.kanghoshin.lis.vo.testanalysis.TestAnalysisChartVo;
import com.kanghoshin.lis.vo.testanalysis.TestAnalysisListVo;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class TestAnalysisServiceImpl implements TestAnalysisService {
	
	private final ResultAnalysisMapper resultAnalysisMapper;

	
	@Override
	public List<TestAnalysisListVo> graph(TestResultAnalysisDto testResultAnalysisDto) {
		
		return resultAnalysisMapper.graph(testResultAnalysisDto);
	}
	
	@Override
	public List<TestAnalysisChartVo> chart(TestResultAnalysisDto testResultAnalysisDto) {
		
		return resultAnalysisMapper.chart(testResultAnalysisDto);
	}
}
