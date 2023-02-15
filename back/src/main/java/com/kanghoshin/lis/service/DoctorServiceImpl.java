package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.DoctorMapper;
import com.kanghoshin.lis.dto.doctor.CreateDoctorDto;
import com.kanghoshin.lis.dto.doctor.ReadDoctorListWithDepartmentDto;
import com.kanghoshin.lis.vo.doctor.DoctorWithDepartmentVo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class DoctorServiceImpl implements DoctorService{

	private final DoctorMapper doctorMapper;
	
	@Override
	public void createDoctor(@NotNull @Valid CreateDoctorDto createDoctorDto) {
		doctorMapper.insert(createDoctorDto);
	}

	@Override
	public DoctorWithDepartmentVo[] readDoctorListWithDepartment(
			@Valid ReadDoctorListWithDepartmentDto readDoctorListWithDepartmentDto) {
		return doctorMapper.selectWithDepartment(readDoctorListWithDepartmentDto);
	}

}
