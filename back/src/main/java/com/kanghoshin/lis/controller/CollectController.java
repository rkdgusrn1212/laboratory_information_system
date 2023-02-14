package com.kanghoshin.lis.controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanghoshin.lis.dto.collect.BloodCollectDto;
import com.kanghoshin.lis.dto.collect.SpecimenDto;
import com.kanghoshin.lis.dto.collect.SubmitInadequateDto;
import com.kanghoshin.lis.service.collect.CollectService;
import com.kanghoshin.lis.vo.collect.BloodCollectVo;
import com.kanghoshin.lis.vo.collect.CollectPatientVo;
import com.kanghoshin.lis.vo.collect.CollectSpecimenVo;
import com.kanghoshin.lis.vo.collect.InadequateTypeVo;
import com.kanghoshin.lis.vo.collect.SubmitInadequateVo;
import com.kanghoshin.lis.vo.entity.StaffVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/collect")
@RequiredArgsConstructor
public class CollectController {

	private final CollectService CollectService;

	@GetMapping("/staffall")
	public List<StaffVo> allstaffall() {
		List<StaffVo> staffnameall = CollectService.getallstafflistall();
		return staffnameall;
	}

	@GetMapping("/patient")
	public List<CollectPatientVo> patientall() {
		List<CollectPatientVo> getpatientList = CollectService.getPatientall();
		return getpatientList;
	}

	@GetMapping("/patientbyname")
	public List<CollectPatientVo> patientbyname(@Valid @Param("patientName") String patientName) {
		List<CollectPatientVo> getpatientbyidList = CollectService.getPatientbyname(patientName);
		return getpatientbyidList;
	}

	@GetMapping("/insertspecimen")
	public CollectSpecimenVo insertspecimen(@Valid @Param("staffNo") String staffNo) {
		SpecimenDto SpecimenDto = new SpecimenDto();
		SpecimenDto.setStaffNo(staffNo);
		CollectSpecimenVo createspecimen = CollectService.createSpecimen(SpecimenDto);
		return createspecimen;
	}

	@PostMapping("/insertspecimenpost")
	public CollectSpecimenVo insertspecimenpost(@Valid @RequestBody SpecimenDto SpecimenDTO) {
		CollectSpecimenVo createspecimen = CollectService.createSpecimen(SpecimenDTO);
		return createspecimen;
	}

	@GetMapping("/createspecimenmulti")
	public List<CollectSpecimenVo> createspecimenmulti(@Valid @Param("staffNo") String staffNo,
			@Param("count") int count) {
		SpecimenDto SpecimenDto = new SpecimenDto();
		SpecimenDto.setStaffNo(staffNo);
		List<CollectSpecimenVo> createspecimenmulti = CollectService.createSpecimenmulti(SpecimenDto, count);
		return createspecimenmulti;
	}

	@GetMapping("/specimenlist")
	public List<CollectSpecimenVo> specimenlist() {
		List<CollectSpecimenVo> specimenlist = CollectService.getSpecimenall();
		return specimenlist;
	}

	@GetMapping("/inadequate_typeList")
	public List<InadequateTypeVo> inadequate_typeall() {
		List<InadequateTypeVo> inadequate_typelist = CollectService.getInadequate_typeall();
		return inadequate_typelist;
	}

	@GetMapping("/insertcollect")
	public BloodCollectVo insertcollect(@Valid @Param("specimenNo") String specimenNo,@Param("staffNo") String staffNo) {
		BloodCollectDto CollectDto = new BloodCollectDto();
		CollectDto.setStaffNo(staffNo);
		CollectDto.setSpecimenNo(specimenNo);

		BloodCollectVo createspecimen = CollectService.createCollect(CollectDto);
		return createspecimen;
	}

	@PostMapping("/insertcollectbypost")
	public void insertcollectbypost(@Valid @RequestBody BloodCollectDto CollectDTO) {
		CollectService.createCollectPost(CollectDTO);
	}

//	@PostMapping("/createcollectmulti")
//	public void createcollectmulti(@Valid @RequestBody CollectDTO CollectDto) {
//		CollectService.createCollect(CollectDto);
//	}

	@GetMapping("/collectlist")
	public List<BloodCollectVo> collectlist() {
		List<BloodCollectVo> specimenlist = CollectService.getCollectall();
		return specimenlist;
	}

	@GetMapping("/collectlistbyno")
	public BloodCollectVo collectlistbyno(@Valid @Param("specimenNo") String specimenNo) {
		BloodCollectVo specimen = CollectService.getCollectbyno(specimenNo);
		return specimen;
	}

	@GetMapping("/submitinadequatelist")
	public List<SubmitInadequateVo> SubmitInadequatelist() {
		List<SubmitInadequateVo> specimenlist = CollectService.getSubmitInadequatelist();
		return specimenlist;
	}

	@GetMapping("/submitinadequatelistbyno")
	public SubmitInadequateVo submitinadequatelistbyno(@Valid @Param("specimenNo") String specimenNo) {
		SubmitInadequateVo createspecimen = CollectService.getSubmitInadequatebyno(specimenNo);
		return createspecimen;
	}

//	@GetMapping("/insertsubmitinadequate1")
//	public void insertsubmitinadequate1 (@Valid @Param("1") String 1, ){
//	System.out.println(SubmitInadequateDTO.toString());
//	CollectService.insertSubmitInadequate(SubmitInadequateDTO);
//	}

	@PostMapping("/insertsubmitinadequate")
	public void insertsubmitinadequate(@Valid @RequestBody SubmitInadequateDto siDto) {
		System.out.println(siDto.toString());
		CollectService.insertSubmitInadequate(siDto);
	}
}