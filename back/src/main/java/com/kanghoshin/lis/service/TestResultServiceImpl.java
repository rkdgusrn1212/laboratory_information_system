package com.kanghoshin.lis.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.ResultMapper;
import com.kanghoshin.lis.dto.test.TestResultSearchDto;
import com.kanghoshin.lis.vo.testresult.TestResultListVo;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class TestResultServiceImpl implements TestResultService {
	
	private final ResultMapper resultMapper;

	@Override
	public List<TestResultListVo> selectByResultList() {
		return resultMapper.selectByResultList();
	}
	
	@Override
	public List<TestResultListVo> selectByPatient(TestResultSearchDto testResultSearchDto) {
		
	System.out.println(testResultSearchDto);
		return resultMapper.selectByPatient(testResultSearchDto);
	}
}
