package com.kanghoshin.lis.dto;

import com.kanghoshin.lis.constraints.PageNoConstraints;
import com.kanghoshin.lis.constraints.PageSizeConstraints;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReadListDto {

	@PageSizeConstraints
	private int pageSize;
	@PageNoConstraints
	private int pageNo;
}
