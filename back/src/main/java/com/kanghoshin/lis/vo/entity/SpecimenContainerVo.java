package com.kanghoshin.lis.vo.entity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.kanghoshin.lis.constraints.specimencontainer.SpecimenContainerCodeConstraints;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SpecimenContainerVo {

	@NotBlank(message="용기 코드가 비어있습니다.")
	@SpecimenContainerCodeConstraints
	private final String specimenContainerCode;
	
	@NotBlank(message="용기 이름이 비어있습니다.")
	@Size(max=40, message="용기 이름이 너무 깁니다.") 
	private final String specimenContainerName;
}