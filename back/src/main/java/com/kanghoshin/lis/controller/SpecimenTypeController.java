package com.kanghoshin.lis.controller;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.specimentype.ReadSpecimenTypeListDto;
import com.kanghoshin.lis.service.SpecimenTypeService;
import com.kanghoshin.lis.vo.entity.SpecimenTypeVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/specimen-type")//직원 사용
public class SpecimenTypeController {

	private final SpecimenTypeService specimenTypeService;
	
	@GetMapping("list")
	public SpecimenTypeVo[] readSpecimenTypeList(@Valid ReadSpecimenTypeListDto readSpecimenTypeListDto) {
		return specimenTypeService.readSpecimenTypeList(readSpecimenTypeListDto);
	}
	
	@GetMapping("{code}")
	public SpecimenTypeVo readSpecimenType(@PathVariable("code") String specimenTypeCode) {
		return specimenTypeService.readSpecimenTypeBySpecimenTypeCode(specimenTypeCode);
	}
}
