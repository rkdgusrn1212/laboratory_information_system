package com.kanghoshin.lis.controller;

import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;
import com.kanghoshin.lis.dto.doctor.ReadDoctorListWithDepartmentDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.service.DoctorService;
import com.kanghoshin.lis.vo.doctor.DoctorWithDepartmentVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/doctor")
@RequiredArgsConstructor
public class DoctorController {
	private final DoctorService doctorService;
	@PostMapping("register")
	public Map<String, Object> registerDoctor(@AuthenticationPrincipal PrincipalDetails principalDetasils, @NotNull @Valid @RequestBody CreateDoctorDto createDoctorDto) throws GeneralErrorWithMessageException {
		return doctorService.registerDoctor(principalDetasils, createDoctorDto);
	}
	
	@GetMapping("list-with-department")
	public DoctorWithDepartmentVo[] readListWithDepartment(@Valid ReadDoctorListWithDepartmentDto readDoctorListWithDepartmentDto) {
		return doctorService.readDoctorListWithDepartment(readDoctorListWithDepartmentDto);
	}
}
