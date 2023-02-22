package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.constraints.specimencontainer.SpecimenContainerCodeConstraints;
import com.kanghoshin.lis.dao.SpecimenContainerMapper;
import com.kanghoshin.lis.dto.specimencontainer.ReadSpecimenContainerListDto;
import com.kanghoshin.lis.vo.entity.SpecimenContainerVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpecimenContainerServiceImpl implements SpecimenContainerService {
	
	private final SpecimenContainerMapper specimenContainerMapper;
	
	@Override
	public SpecimenContainerVo readSpecimenContainerBySpecimenContainerCode(
			@NotBlank @SpecimenContainerCodeConstraints String SpecimenConatiner) {
		return specimenContainerMapper.findSpecimenBySpecimenContainerCode(SpecimenConatiner);
	}

	@Override
	public SpecimenContainerVo[] readSpecimenContainerList(@NotNull @Valid ReadSpecimenContainerListDto readSpecimenContainerListDto) {
		return specimenContainerMapper.select(readSpecimenContainerListDto);
	}
}
