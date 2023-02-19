package com.kanghoshin.lis.service;

import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.ConsultationMapper;
import com.kanghoshin.lis.dto.consultation.ReadFullConsultationListDto;
import com.kanghoshin.lis.vo.consultation.FullConsultationVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConsultationServiceImpl implements ConsultationService {

	private final ConsultationMapper consultationMapper;

	@Override
	public FullConsultationVo[] readFullConsultationList(
			@Valid ReadFullConsultationListDto readFullConsultationListDto) {
		return consultationMapper.selectFullConsultation(readFullConsultationListDto);
	}
	
	
}
