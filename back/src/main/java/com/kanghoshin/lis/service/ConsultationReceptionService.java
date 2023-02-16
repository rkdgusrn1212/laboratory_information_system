package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.dto.consultationreception.CreateConsultationWalkInDto;
import com.kanghoshin.lis.dto.consultationreception.ReadConsultationWalkInListDto;
import com.kanghoshin.lis.vo.consultationreception.ConsultationWalkInVo;

@Valid
public interface ConsultationReceptionService{ 
	void createConsultationWalkIn(@NotNull @Valid CreateConsultationWalkInDto createConsultationWalkInDto);
	ConsultationWalkInVo[] readConsultationWalkInList(@Valid ReadConsultationWalkInListDto readConsultationWalkInListDto);
}
