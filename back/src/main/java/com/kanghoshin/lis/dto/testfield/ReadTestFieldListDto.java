package com.kanghoshin.lis.dto.testfield;

import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class ReadTestFieldListDto extends ReadListDto{

	String testFieldCodeKey;
	String testFieldNameKey;
	@OrderConstraints
	String testFieldCodeOrder;
	@OrderConstraints
	String testFieldNameOrder;
}
