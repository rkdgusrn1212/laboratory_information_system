package com.kanghoshin.lis.vo.entity;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.NoConstraints;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ConsultationVo {

	@NoConstraints
	private final int consultationNo;
	
	@NoConstraints
	private final int consultationReceptionNo;
	
	@NotNull
	private final Date consultationTime;
}
