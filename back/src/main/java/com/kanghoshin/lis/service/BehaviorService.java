package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.behavior.ReadBehaviorListDto;
import com.kanghoshin.lis.vo.entity.BehaviorVo;

@Validated
public interface BehaviorService {
	BehaviorVo readBehaviorByBehaviorCode(@NotBlank String behaviorCode);
	BehaviorVo[] readBehaviorList(@NotNull @Valid ReadBehaviorListDto readBehaviorListDto);
}
