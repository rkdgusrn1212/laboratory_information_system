package com.kanghoshin.lis.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.ResultInputMapper;
import com.kanghoshin.lis.dto.test.TestResultInputDto;
import com.kanghoshin.lis.vo.testresult.TestResultInputVo;
import com.kanghoshin.lis.vo.testresult.TestResultVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestResultInputServiceImpl implements TestResultInputService {

	private final ResultInputMapper resultInputMapper;

	@Override
	public TestResultInputVo findBySpecimenNo(int specimenNo) {
		return resultInputMapper.findBySpecimenNo(specimenNo);
	}
	
	@Override
	public void insert(TestResultInputDto testResultInputDto) {
//		System.out.println("hi");
		resultInputMapper.insert(testResultInputDto);
	}
	
	@Override
	public List<TestResultVo> selectResult() {
		return resultInputMapper.selectResult();
	}
	
}
