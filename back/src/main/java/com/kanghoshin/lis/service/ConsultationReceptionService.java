package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.dto.consultationreception.CreateConsultationAppointmentDto;
import com.kanghoshin.lis.dto.consultationreception.CreateConsultationWalkInDto;
import com.kanghoshin.lis.dto.consultationreception.ReadConsultationAppointmentListDto;
import com.kanghoshin.lis.dto.consultationreception.ReadConsultationWalkInListDto;
import com.kanghoshin.lis.vo.consultationreception.ConsultationAppointmentVo;
import com.kanghoshin.lis.vo.consultationreception.ConsultationWalkInVo;

@Valid
public interface ConsultationReceptionService{ 
	void createConsultationWalkIn(@NotNull @Valid CreateConsultationWalkInDto createConsultationWalkInDto);
	void createConsultationAppointment(@NotNull @Valid CreateConsultationAppointmentDto createConsultationAppointmentDto);
	ConsultationWalkInVo[] readConsultationWalkInList(@Valid ReadConsultationWalkInListDto readConsultationWalkInListDto);
	ConsultationAppointmentVo[] readConsultationAppointmentList(
			@NotNull @Valid ReadConsultationAppointmentListDto readConsultationAppointmentListDto);
}
