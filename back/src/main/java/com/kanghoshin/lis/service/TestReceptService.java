package com.kanghoshin.lis.service;

import java.util.List;

import com.kanghoshin.lis.dto.test.TestReceptDto;
import com.kanghoshin.lis.vo.testrecept.ReceptTestListVo;
import com.kanghoshin.lis.vo.testrecept.ReceptTestSearchVo;

public interface TestReceptService {

	List<ReceptTestSearchVo> findBySpecimenNo(int specimenNo);

	void insert(TestReceptDto testReceptDto);

	List<ReceptTestListVo> selectByReceptList();
}
