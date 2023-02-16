package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.ConsultationReceptionMapper;
import com.kanghoshin.lis.dto.consultationreception.CreateConsultationWalkInDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConsultationReceptionServiceImpl implements ConsultationReceptionService{

	private final ConsultationReceptionMapper consultationReceptionMapper;
	
	@Override
	public void createConsultationWalkInService(
			@NotNull @Valid CreateConsultationWalkInDto createConsultationWalkInDto) {
		consultationReceptionMapper.insertWalkIn(createConsultationWalkInDto);
	}

}
