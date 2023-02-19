package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.constraints.specimencontainer.SpecimenContainerCodeConstraints;
import com.kanghoshin.lis.dto.specimencontainer.ReadSpecimenContainerListDto;
import com.kanghoshin.lis.vo.entity.SpecimenContainerVo;

@Validated
public interface SpecimenContainerService {
	
	SpecimenContainerVo readSpecimenContainerBySpecimenContainerCode(@NotBlank @SpecimenContainerCodeConstraints String SpecimenConatiner);
	
	SpecimenContainerVo[] readSpecimenContainerList(@Valid ReadSpecimenContainerListDto readSpecimenContainerListDto);
}