package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;
import com.kanghoshin.lis.dto.doctor.ReadDoctorListWithDepartmentDto;
import com.kanghoshin.lis.vo.doctor.DoctorWithDepartmentVo;

@Validated
public interface DoctorService {
	void createDoctor(@NotNull PrincipalDetails principalDetasils, @NotNull @Valid CreateDoctorDto createDoctorDto);
	DoctorWithDepartmentVo[] readDoctorListWithDepartment(@Valid ReadDoctorListWithDepartmentDto readDoctorListWithDepartmentDto);
}
