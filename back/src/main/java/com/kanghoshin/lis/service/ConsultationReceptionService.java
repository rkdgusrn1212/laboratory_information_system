package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.dto.consultationreception.CreateConsultationWalkInDto;

@Valid
public interface ConsultationReceptionService{ 
	void createConsultationWalkInService(@NotNull @Valid CreateConsultationWalkInDto createConsultationWalkInDto);
}
