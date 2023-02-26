package com.kanghoshin.lis.controller;

import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;
import com.kanghoshin.lis.dto.doctor.ReadDoctorListWithDepartmentDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.service.DoctorService;
import com.kanghoshin.lis.vo.doctor.DoctorWithDepartmentVo;
import com.kanghoshin.lis.vo.doctor.ExclusiveDoctorVo;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/doctor")
@RequiredArgsConstructor
public class DoctorController {
	private final DoctorService doctorService;
	@PostMapping("register")//nontype만
	public Map<String, Object> registerDoctor(@AuthenticationPrincipal PrincipalDetails principalDetasils, @NotNull @Valid @RequestBody CreateDoctorDto createDoctorDto) throws GeneralErrorWithMessageException {
		return doctorService.registerDoctor(principalDetasils, createDoctorDto);
	}
	
	@GetMapping("list-with-department")//진료접수모듈에서 사용
	public DoctorWithDepartmentVo[] readListWithDepartment(@Valid ReadDoctorListWithDepartmentDto readDoctorListWithDepartmentDto) {
		return doctorService.readDoctorListWithDepartment(readDoctorListWithDepartmentDto);
	}
	
	@GetMapping("{id}")//환자도 열람 가능해야함
	public ExclusiveDoctorVo readDoctor(@NoConstraints @PathVariable("id") int doctorNo) {
		return doctorService.readDoctor(doctorNo);
	}
}
