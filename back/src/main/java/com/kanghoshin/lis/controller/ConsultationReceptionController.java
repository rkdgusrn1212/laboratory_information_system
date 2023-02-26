package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.consultationreception.CreateConsultationAppointmentDto;
import com.kanghoshin.lis.dto.consultationreception.CreateConsultationWalkInDto;
import com.kanghoshin.lis.dto.consultationreception.ReadConsultationWalkInListDto;
import com.kanghoshin.lis.service.ConsultationReceptionService;
import com.kanghoshin.lis.vo.consultationreception.ConsultationWalkInVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/consultation-reception")
@RequiredArgsConstructor
public class ConsultationReceptionController {
	
	private final ConsultationReceptionService consultationReceptionService;
	

	@PostMapping("appointment")
	public void createConsultationAppointment(@Valid @RequestBody CreateConsultationAppointmentDto createConsultationAppointmentDto) {
		consultationReceptionService.createConsultationAppointment(createConsultationAppointmentDto);
	}
	
	@PostMapping("walk-in")
	public void createConsultationWalkIn(@Valid @RequestBody CreateConsultationWalkInDto createConsultationWalkInDto) {
		consultationReceptionService.createConsultationWalkIn(createConsultationWalkInDto);
	}
	
	@GetMapping("list")
	public ConsultationWalkInVo[] readConsultationWalkInList(@Valid ReadConsultationWalkInListDto readConsultationWalkInListDto) {
		return consultationReceptionService.readConsultationWalkInList(readConsultationWalkInListDto);
	}
}
