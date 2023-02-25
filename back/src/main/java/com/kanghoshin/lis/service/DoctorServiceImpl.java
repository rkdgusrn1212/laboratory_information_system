package com.kanghoshin.lis.service;

import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.config.jwt.JwtService;
import com.kanghoshin.lis.config.principal.PrincipalDetails;
import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dao.DoctorMapper;
import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;
import com.kanghoshin.lis.dto.doctor.ReadDoctorListWithDepartmentDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.vo.doctor.DoctorWithDepartmentVo;
import com.kanghoshin.lis.vo.doctor.ExclusiveDoctorVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class DoctorServiceImpl implements DoctorService{

	private final DoctorMapper doctorMapper;
	private final JwtService jwtService;

	@Override
	public Map<String, Object> registerDoctor(@NotNull PrincipalDetails principalDetasils, @NotNull @Valid CreateDoctorDto createDoctorDto) throws GeneralErrorWithMessageException {
		doctorMapper.insert(principalDetasils.getStaffVo().getStaffNo(), createDoctorDto);
		return jwtService.createJwtUpdated(principalDetasils);
	}

	@Override
	public DoctorWithDepartmentVo[] readDoctorListWithDepartment(
			@Valid ReadDoctorListWithDepartmentDto readDoctorListWithDepartmentDto) {
		return doctorMapper.selectWithDepartment(readDoctorListWithDepartmentDto);
	}

	@Override
	public ExclusiveDoctorVo readDoctor(@NoConstraints int doctorNo) {
		return doctorMapper.findDoctorByDoctorNo(doctorNo);
	}

}
