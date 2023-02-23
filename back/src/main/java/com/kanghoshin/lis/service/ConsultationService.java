package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.consultation.CreateConsultationDto;
import com.kanghoshin.lis.dto.consultation.ReadFullConsultationListDto;
import com.kanghoshin.lis.vo.consultation.FullConsultationVo;

@Validated
public interface ConsultationService {
	
	int createConsultation(@NotNull @Valid CreateConsultationDto createConsultationDto);
	FullConsultationVo[] readFullConsultationList(@Valid ReadFullConsultationListDto readFullConsultationListDto);

}
