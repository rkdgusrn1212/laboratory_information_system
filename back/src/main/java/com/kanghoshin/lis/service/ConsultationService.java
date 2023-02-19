package com.kanghoshin.lis.service;

import javax.validation.Valid;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.consultation.ReadFullConsultationListDto;
import com.kanghoshin.lis.vo.consultation.FullConsultationVo;

@Validated
public interface ConsultationService {
	
	FullConsultationVo[] readFullConsultationList(@Valid ReadFullConsultationListDto readFullConsultationListDto);

}
