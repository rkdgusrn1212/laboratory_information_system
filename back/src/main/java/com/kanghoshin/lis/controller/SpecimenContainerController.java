package com.kanghoshin.lis.controller;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.specimencontainer.ReadSpecimenContainerListDto;
import com.kanghoshin.lis.service.SpecimenContainerService;
import com.kanghoshin.lis.vo.entity.SpecimenContainerVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/specimen-container")//직원만
public class SpecimenContainerController {

	private final SpecimenContainerService specimenContainerService;
	
	@GetMapping("list")
	public SpecimenContainerVo[] readSpecimenContainerList(@Valid ReadSpecimenContainerListDto readSpecimenContainerListDto) {
		return specimenContainerService.readSpecimenContainerList(readSpecimenContainerListDto);
	}
	
	@GetMapping("{code}")
	public SpecimenContainerVo readSpecimenContainer(@PathVariable("code") String specimenContainerCode) {
		return specimenContainerService.readSpecimenContainerBySpecimenContainerCode(specimenContainerCode);
	}
}
