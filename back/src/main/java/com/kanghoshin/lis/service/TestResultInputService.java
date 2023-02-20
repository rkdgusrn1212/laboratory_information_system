package com.kanghoshin.lis.service;

import com.kanghoshin.lis.dto.test.TestResultInputDto;
import com.kanghoshin.lis.vo.testresult.TestResultInputVo;

public interface TestResultInputService {

	TestResultInputVo findBySpecimenNo(int specimenNo);
	
	void insert(TestResultInputDto testResultInputDto);

}
