package com.kanghoshin.lis.service;

import javax.validation.Valid;

import org.springframework.stereotype.Service;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dao.StaffMapper;
import com.kanghoshin.lis.dto.staff.ReadStaffListDto;
import com.kanghoshin.lis.vo.entity.StaffVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService{

	private final StaffMapper staffMapper;
	
	@Override
	public StaffVo[] readStaffList(@Valid ReadStaffListDto readStaffListDto) {
		return staffMapper.select(readStaffListDto);
	}

	@Override
	public StaffVo readStaff(@NoConstraints int staffNo) {
		return staffMapper.findByStaffNo(staffNo);
	}

}
