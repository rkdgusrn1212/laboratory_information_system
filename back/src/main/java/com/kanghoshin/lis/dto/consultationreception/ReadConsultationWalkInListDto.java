package com.kanghoshin.lis.dto.consultationreception;

import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ReadConsultationWalkInListDto extends ReadListDto{
	
	private int staffNo;//key와다르게 등호 연산

	@OrderConstraints
	private String staffNoOrder;
	
	private int consultationWalkInOrderStart;
	private int consultationWalkInOrderEnd;
	
	@OrderConstraints
	private String consultationWalkInOrderOrder;
}
