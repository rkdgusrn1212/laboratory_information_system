package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.consultation.CreateConsultationDto;
import com.kanghoshin.lis.dto.consultation.ReadFullConsultationListDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.service.ConsultationService;
import com.kanghoshin.lis.vo.consultation.FullConsultationVo;
import com.kanghoshin.lis.vo.entity.ConsultationVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/consultation")
public class ConsultationController {

	private final ConsultationService consultationService;
	
	@GetMapping("/full-consultation/list")//직원만 사용가능
	public FullConsultationVo[] readFullConsultationList(@Valid ReadFullConsultationListDto readFullConsultationlistDto) {
		return consultationService.readFullConsultationList(readFullConsultationlistDto);
	}
	
	@PostMapping//의사만 사용가능
	public ConsultationVo createConsultation(@Valid @RequestBody CreateConsultationDto createConsultationDto) throws GeneralErrorWithMessageException {
		return consultationService.createConsultation(createConsultationDto);
	}
}
