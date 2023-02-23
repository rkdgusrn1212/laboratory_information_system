package com.kanghoshin.lis.dto.consultation;

import com.kanghoshin.lis.constraints.NoConstraints;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateConsultationDto {
	
	private int consultationNo;
	
	@NoConstraints
	private int consultationReceptionNo;
}
