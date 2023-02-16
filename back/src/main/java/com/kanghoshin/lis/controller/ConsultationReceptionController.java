package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.consultationreception.CreateConsultationWalkInDto;
import com.kanghoshin.lis.service.ConsultationReceptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/consultation-reception/walk-in")
@RequiredArgsConstructor
public class ConsultationReceptionController {
	
	private final ConsultationReceptionService consultationReceptionService;
	
	@PostMapping
	public void createConsultationWalkIn(@Valid @RequestBody CreateConsultationWalkInDto createConsultationWalkInDto) {
		consultationReceptionService.createConsultationWalkInService(createConsultationWalkInDto);
	}
}
