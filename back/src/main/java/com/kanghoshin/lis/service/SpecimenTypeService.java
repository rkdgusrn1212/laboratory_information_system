package com.kanghoshin.lis.service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.constraints.specimentype.SpecimenTypeCodeConstraints;
import com.kanghoshin.lis.dto.specimentype.ReadSpecimenTypeListDto;
import com.kanghoshin.lis.vo.entity.SpecimenTypeVo;

@Validated
public interface SpecimenTypeService {
	
	SpecimenTypeVo readSpecimenTypeBySpecimenTypeCode(@NotBlank @SpecimenTypeCodeConstraints String SpecimenConatiner);
	
	SpecimenTypeVo[] readSpecimenTypeList(@NotNull ReadSpecimenTypeListDto readSpecimenTypeListDto);
}
