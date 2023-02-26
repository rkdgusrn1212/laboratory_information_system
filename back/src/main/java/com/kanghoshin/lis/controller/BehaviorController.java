package com.kanghoshin.lis.controller;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.behavior.ReadBehaviorListDto;
import com.kanghoshin.lis.service.BehaviorService;
import com.kanghoshin.lis.vo.entity.BehaviorVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/behavior")
public class BehaviorController {
	
	private final BehaviorService behaviorService;
	

	@GetMapping("list")//직원만 사용가능
	public BehaviorVo[] readBehaviorListCode(@Valid ReadBehaviorListDto readBehaviorListDto) {
		return behaviorService.readBehaviorList(readBehaviorListDto);
	}
	
	@GetMapping("{id}")//직원만 사용가능
	public BehaviorVo readBehaviorByBehaviorCode(@PathVariable("id") String behaviorCode) {
		return behaviorService.readBehaviorByBehaviorCode(behaviorCode);
	}
}
