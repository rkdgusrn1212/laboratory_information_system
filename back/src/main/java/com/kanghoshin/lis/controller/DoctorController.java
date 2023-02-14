package com.kanghoshin.lis.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;
import com.kanghoshin.lis.service.DoctorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/doctor")
@RequiredArgsConstructor
public class DoctorController {
	private final DoctorService doctorService;
	@PostMapping
	public void createDoctor(@NotNull @Valid @RequestBody CreateDoctorDto createDoctorDto) {
		doctorService.createDoctor(createDoctorDto);
	}
}