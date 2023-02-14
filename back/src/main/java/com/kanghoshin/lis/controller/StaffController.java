package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.staff.ReadStaffListDto;
import com.kanghoshin.lis.service.StaffService;
import com.kanghoshin.lis.vo.entity.StaffVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/staff")
@RequiredArgsConstructor
public class StaffController {
	
	private final StaffService staffService;
	
	@GetMapping("list")
	public StaffVo[] readStaffList(@Valid ReadStaffListDto readStaffListDto) {
		return staffService.readStaffList(readStaffListDto);
	}
}
