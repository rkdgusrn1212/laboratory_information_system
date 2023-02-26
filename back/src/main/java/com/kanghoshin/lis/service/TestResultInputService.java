package com.kanghoshin.lis.service;

import java.util.List;

import com.kanghoshin.lis.dto.test.TestResultInputDto;
import com.kanghoshin.lis.vo.testresult.TestResultInputVo;
import com.kanghoshin.lis.vo.testresult.TestResultVo;

public interface TestResultInputService {

	TestResultInputVo findBySpecimenNo(int specimenNo);
	
	void insert(TestResultInputDto testResultInputDto);
	
	List<TestResultVo> selectResult();

}
