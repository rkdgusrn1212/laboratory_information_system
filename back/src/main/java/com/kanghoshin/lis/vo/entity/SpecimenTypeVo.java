package com.kanghoshin.lis.vo.entity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.kanghoshin.lis.constraints.specimentype.SpecimenTypeCodeConstraints;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SpecimenTypeVo {

	@NotBlank(message="검체(검체타입) 코드가 비어있습니다.")
	@SpecimenTypeCodeConstraints
	private final String specimenTypeCode;
	
	@NotBlank(message="검체(검체 타입) 이름 비어있습니다.")
	@Size(max=40, message="용기 이름이 너무 깁니다.") 
	private final String specimenTypeName;
}