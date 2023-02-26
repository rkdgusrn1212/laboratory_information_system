package com.kanghoshin.lis.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.ReceptMapper;
import com.kanghoshin.lis.dto.test.TestReceptDto;
import com.kanghoshin.lis.vo.testrecept.ReceptTestListVo;
import com.kanghoshin.lis.vo.testrecept.ReceptTestSearchVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestReceptServiceImpl implements TestReceptService {

	private final ReceptMapper receptMapper;

	@Override
	public List<ReceptTestSearchVo> findBySpecimenNo(int specimenNo) {
		return receptMapper.findBySpecimenNo(specimenNo);
	}

	@Override
	public void insert(TestReceptDto testReceptDto) {
		System.out.println("hello");
		receptMapper.insert(testReceptDto);
	}

	@Override
	public List<ReceptTestListVo> selectByReceptList() {
		return receptMapper.selectByReceptList();
	}

}
