package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.consultation.ReadFullConsultationListDto;
import com.kanghoshin.lis.service.ConsultationService;
import com.kanghoshin.lis.vo.consultation.FullConsultationVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/consultation")
public class ConsultationController {

	private final ConsultationService consultationService;
	
	@GetMapping("/full-consultation/list")
	public FullConsultationVo[] readFullConsultationList(@Valid ReadFullConsultationListDto readFullConsultationlistDto) {
		return consultationService.readFullConsultationList(readFullConsultationlistDto);
	}
}
