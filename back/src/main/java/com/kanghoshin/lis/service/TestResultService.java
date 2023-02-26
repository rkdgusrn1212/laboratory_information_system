package com.kanghoshin.lis.service;

import java.util.List;

import com.kanghoshin.lis.dto.test.TestResultSearchDto;
import com.kanghoshin.lis.vo.testresult.TestResultListVo;

public interface TestResultService {
	
	List<TestResultListVo> selectByResultList();
	
	List<TestResultListVo> selectByPatient(TestResultSearchDto testResultSearchDto);
}
