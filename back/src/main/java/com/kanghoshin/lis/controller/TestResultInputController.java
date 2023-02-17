package com.kanghoshin.lis.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.test.TestReceptDto;
import com.kanghoshin.lis.service.TestReceptService;
import com.kanghoshin.lis.vo.testrecept.ReceptTestListVo;
import com.kanghoshin.lis.vo.testrecept.ReceptTestSearchVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/testresult")
@RequiredArgsConstructor
public class TestResultInputController {

	private final TestReceptService receptService;

	@GetMapping("findspecimen")
	public ReceptTestSearchVo findBySpecimenNo(@RequestParam("specimenNo") int specimenNo) {
		System.out.println(specimenNo);
		return receptService.findBySpecimenNo(specimenNo);
	}

	@PostMapping("recepttest")
	public void insert(@RequestBody TestReceptDto receptTestDto) {
		receptService.insert(receptTestDto);
	}

	@GetMapping("selectspecimen")
	public List<ReceptTestListVo> selectByReceptList() {
		return receptService.selectByReceptList();
	}
}
