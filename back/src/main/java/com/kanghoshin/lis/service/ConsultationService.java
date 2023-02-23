package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.consultation.CreateConsultationDto;
import com.kanghoshin.lis.dto.consultation.ReadFullConsultationListDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.vo.consultation.FullConsultationVo;
import com.kanghoshin.lis.vo.entity.ConsultationVo;

@Validated
public interface ConsultationService {
	
	ConsultationVo createConsultation(@NotNull @Valid CreateConsultationDto createConsultationDto) throws GeneralErrorWithMessageException;
	FullConsultationVo[] readFullConsultationList(@Valid ReadFullConsultationListDto readFullConsultationListDto);

}
