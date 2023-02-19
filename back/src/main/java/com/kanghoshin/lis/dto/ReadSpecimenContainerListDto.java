package com.kanghoshin.lis.dto;

import com.kanghoshin.lis.constraints.OrderConstraints;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ReadSpecimenContainerListDto extends ReadListDto{
	
	String specimenContainerCodeKey;
	
	@OrderConstraints
	String specimenContainerCodeOrder;
	
	String specimenContainerNameKey;
	
	@OrderConstraints
	String specimenContainerNameOrder;
}
