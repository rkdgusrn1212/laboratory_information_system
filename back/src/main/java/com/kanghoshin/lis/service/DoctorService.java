package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;

@Validated
public interface DoctorService {
	void createDoctor(@NotNull @Valid CreateDoctorDto createDoctorDto);
}
