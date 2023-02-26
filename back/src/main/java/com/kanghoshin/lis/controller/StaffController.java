package com.kanghoshin.lis.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.dto.staff.ReadStaffListDto;
import com.kanghoshin.lis.service.StaffService;
import com.kanghoshin.lis.vo.entity.StaffVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/staff")
@RequiredArgsConstructor
public class StaffController {
	
	private final StaffService staffService;
	
	@GetMapping("list")//환자도 볼수 있어햐함(일단 개인 민감 정보 고려안함)
	public StaffVo[] readStaffList(@Valid ReadStaffListDto readStaffListDto) {
		return staffService.readStaffList(readStaffListDto);
	}
	
	@GetMapping("{no}")//환자도 볼수 있어햐함(일단 개인 민감 정보 고려안함)
	public StaffVo readStaff(@NoConstraints @PathVariable("no") int staffNo) {
		return staffService.readStaff(staffNo);
	}
}
