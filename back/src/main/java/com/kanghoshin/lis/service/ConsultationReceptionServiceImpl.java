package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.ConsultationReceptionMapper;
import com.kanghoshin.lis.dto.consultationreception.CreateConsultationAppointmentDto;
import com.kanghoshin.lis.dto.consultationreception.CreateConsultationWalkInDto;
import com.kanghoshin.lis.dto.consultationreception.ReadConsultationAppointmentListDto;
import com.kanghoshin.lis.dto.consultationreception.ReadConsultationWalkInListDto;
import com.kanghoshin.lis.vo.consultationreception.ConsultationAppointmentVo;
import com.kanghoshin.lis.vo.consultationreception.ConsultationWalkInVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConsultationReceptionServiceImpl implements ConsultationReceptionService{

	private final ConsultationReceptionMapper consultationReceptionMapper;
	
	@Override
	public void createConsultationWalkIn(
			@NotNull @Valid CreateConsultationWalkInDto createConsultationWalkInDto) {
		consultationReceptionMapper.insertWalkIn(createConsultationWalkInDto);
	}

	@Override
	public ConsultationWalkInVo[] readConsultationWalkInList(@Valid ReadConsultationWalkInListDto readConsultationWalkInListDto) {
		return consultationReceptionMapper.selectWalkIn(readConsultationWalkInListDto);
	}

	@Override
	public void createConsultationAppointment(
			@NotNull @Valid CreateConsultationAppointmentDto createConsultationAppointmentDto) {
		consultationReceptionMapper.insertAppointment(createConsultationAppointmentDto);
	}

	@Override
	public ConsultationAppointmentVo[] readConsultationAppointmentList(
			@NotNull @Valid ReadConsultationAppointmentListDto readConsultationAppointmentListDto) {
		return consultationReceptionMapper.selectAppoint(readConsultationAppointmentListDto);
	}
}
