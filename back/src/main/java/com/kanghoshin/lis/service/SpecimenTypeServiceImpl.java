package com.kanghoshin.lis.service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.constraints.specimentype.SpecimenTypeCodeConstraints;
import com.kanghoshin.lis.dao.SpecimenTypeMapper;
import com.kanghoshin.lis.dto.specimentype.ReadSpecimenTypeListDto;
import com.kanghoshin.lis.vo.entity.SpecimenTypeVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpecimenTypeServiceImpl implements SpecimenTypeService {
	
	private final SpecimenTypeMapper specimenTypeMapper;
	
	@Override
	public SpecimenTypeVo readSpecimenTypeBySpecimenTypeCode(
			@NotBlank @SpecimenTypeCodeConstraints String SpecimenConatiner) {
		return specimenTypeMapper.findSpecimenBySpecimenTypeCode(SpecimenConatiner);
	}

	@Override
	public SpecimenTypeVo[] readSpecimenTypeList(
			@NotNull ReadSpecimenTypeListDto readSpecimenTypeListDto) {
		return specimenTypeMapper.select(readSpecimenTypeListDto);
	}
}
