package com.kanghoshin.lis.dto.specimentype;

import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ReadSpecimenTypeListDto extends ReadListDto{
	
	String specimenTypeCodeKey;
	
	@OrderConstraints
	String specimenTypeCodeOrder;
	
	String specimenTypeNameKey;
	
	@OrderConstraints
	String specimenTypeNameOrder;
}
