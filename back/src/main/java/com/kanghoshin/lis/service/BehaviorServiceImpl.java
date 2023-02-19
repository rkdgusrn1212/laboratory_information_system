package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.BehaviorMapper;
import com.kanghoshin.lis.dto.behavior.ReadBehaviorListDto;
import com.kanghoshin.lis.vo.entity.BehaviorVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BehaviorServiceImpl implements BehaviorService{
	
	private final BehaviorMapper behaviorMapper;
	
	@Override
	public BehaviorVo readBehaviorByBehaviorCode(@NotBlank String behaviorCode) {
		return behaviorMapper.findByBehaviorCode(behaviorCode);
	}

	@Override
	public BehaviorVo[] readBehaviorList(@NotNull @Valid ReadBehaviorListDto readBehaviorListDto) {
		return behaviorMapper.select(readBehaviorListDto);
	}
}
