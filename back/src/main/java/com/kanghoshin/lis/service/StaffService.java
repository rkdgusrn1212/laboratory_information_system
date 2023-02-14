package com.kanghoshin.lis.service;

import javax.validation.Valid;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dto.staff.ReadStaffListDto;
import com.kanghoshin.lis.vo.entity.StaffVo;

@Validated
public interface StaffService {
	StaffVo[] readStaffList(@Valid ReadStaffListDto readStaffListDto);
	StaffVo readStaff(@NoConstraints int staffNo);
}
