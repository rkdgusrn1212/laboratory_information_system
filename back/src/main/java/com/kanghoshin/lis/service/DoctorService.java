package com.kanghoshin.lis.service;

import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;
import com.kanghoshin.lis.dto.doctor.ReadDoctorListWithDepartmentDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.vo.doctor.DoctorWithDepartmentVo;
import com.kanghoshin.lis.vo.doctor.ExclusiveDoctorVo;

@Validated
public interface DoctorService {
	Map<String, Object> registerDoctor(@NotNull PrincipalDetails principalDetasils, @NotNull @Valid CreateDoctorDto createDoctorDto) throws GeneralErrorWithMessageException;
	DoctorWithDepartmentVo[] readDoctorListWithDepartment(@Valid ReadDoctorListWithDepartmentDto readDoctorListWithDepartmentDto);
	ExclusiveDoctorVo readDoctor(@NoConstraints int doctorNo);
}
