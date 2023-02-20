package com.kanghoshin.lis.service;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.ResultInputMapper;
import com.kanghoshin.lis.dto.test.TestResultInputDto;
import com.kanghoshin.lis.vo.testresult.TestResultInputVo;

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

	}
}
