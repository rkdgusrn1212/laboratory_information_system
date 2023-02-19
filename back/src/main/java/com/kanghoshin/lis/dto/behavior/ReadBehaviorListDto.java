package com.kanghoshin.lis.dto.behavior;

import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class ReadBehaviorListDto extends ReadListDto{
	
	private String behaviorCodeKey;
	@OrderConstraints
	private String behaviorCodeOrder;
	private String behaviorClassificationKey;
	@OrderConstraints
	private String behaviorClassificationOrder;
	private String behaviorNameKrKey;
	@OrderConstraints
	private String behaviorNameKrOrder;
	private String behaviorNameEnKey;
	@OrderConstraints
	private String behaviorNameEnOrder;

}
