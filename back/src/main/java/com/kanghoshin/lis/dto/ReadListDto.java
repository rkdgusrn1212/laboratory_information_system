package com.kanghoshin.lis.dto;

import javax.validation.constraints.Min;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReadListDto {

	@Min(value=1, message="페이징 크기가 주어지지 않았습니다.")
	private int pageSize;
	@Min(value=0, message="패이징 시작 레코드가 주어지지 않았습니다.")
	private int pageStart;
}
