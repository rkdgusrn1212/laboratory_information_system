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
import com.kanghoshin.lis.vo.collect.CollectPrescriptionOrderVo;
import com.kanghoshin.lis.vo.collect.CollectPrescriptionVo;
import com.kanghoshin.lis.vo.collect.CollectSpecimenVo;
import com.kanghoshin.lis.vo.collect.InadequateTypeVo;
import com.kanghoshin.lis.vo.collect.ReceptCollectionVo;
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

	@PostMapping("/insertspecimenpost")
	public CollectSpecimenVo insertspecimenpost(@Valid @RequestBody SpecimenDto SpecimenDTO) {
		CollectSpecimenVo createspecimen = CollectService.createSpecimen(SpecimenDTO);
		return createspecimen;
	}
	
	@PostMapping("/insertspecimenpostgetspecimenno")
	public String insertspecimenpostgetspecimenno(@Valid @RequestBody SpecimenDto SpecimenDTO) {
		String createspecimen = CollectService.createSpecimengetno(SpecimenDTO);
		return createspecimen;
	}
	
	@PostMapping("/insertspecimenRCpostgetspecimenno")
	public String insertspecimenRCpostgetspecimenno(@Valid @RequestBody SpecimenDto SpecimenDTO) {
		String createspecimen = CollectService.createSpecimenRCgetno(SpecimenDTO);
		return createspecimen;
	}
///////////////오더 넘버, 스태프 넘버,용기코드
	@PostMapping("/inserttest")
	public void test(@Valid @RequestBody List<SpecimenDto> list) {
		       CollectService.createSpecimenRCgetno2(list);
	}
	
	@PostMapping("/inserttest2")
	public List<SpecimenDto> test2(@Valid @RequestBody List<SpecimenDto> list) {
		    return CollectService.createSpecimenRCgetno3(list);
	}
	
	
	
	
	
	
	//검체입력받고 오더입력 받아서 삽입
	@PostMapping("/createReceptCollection")
	public void createReceptCollection(@Valid @RequestBody SpecimenDto SpecimenDTO) {
		CollectService.	createReceptCollection(SpecimenDTO);
	
	}


	@GetMapping("/specimenlist")
	public List<CollectSpecimenVo> specimenlist() {
		List<CollectSpecimenVo> specimenlist = CollectService.getSpecimenall();
		return specimenlist;
	}

	//채혈페이지 검색값
	@GetMapping("/specimenbyno")
	public List<CollectSpecimenVo> specimenbyno(@Valid @Param("specimenNo") String specimenNo) {
		List<CollectSpecimenVo> specimen = CollectService.getSpecimenbyno(specimenNo);
		return specimen;
	}

	//부적합페이지 리스트
	@GetMapping("/inadequate_typeList")
	public List<InadequateTypeVo> inadequate_typeall() {
		List<InadequateTypeVo> inadequate_typelist = CollectService.getInadequate_typeall();
		return inadequate_typelist;
	}

	@GetMapping("/insertcollect")
	public List<BloodCollectVo> insertcollect(@Valid @Param("specimenNo") String specimenNo,
			@Param("staffNo") String staffNo) {
		BloodCollectDto CollectDto = new BloodCollectDto();
		CollectDto.setStaffNo(staffNo);
		CollectDto.setSpecimenNo(specimenNo);

		List<BloodCollectVo> createspecimen = CollectService.createCollect(CollectDto);
		return createspecimen;
	}

	@PostMapping("/insertcollectbypost")
	public void insertcollectbypost(@Valid @RequestBody BloodCollectDto CollectDTO) {
		System.out.println(CollectDTO);
		CollectService.createCollectPost(CollectDTO);
	}

	//채혈페이지에서 사용
	@GetMapping("/collectlist")
	public List<BloodCollectVo> collectlist() {
		List<BloodCollectVo> specimenlist = CollectService.getCollectall();
		return specimenlist;
	}

	//채혈 다이얼로그
	@GetMapping("/collectlistbyno")
	public List<BloodCollectVo> collectlistbyno(@Valid @Param("specimenNo") String specimenNo) {
		List<BloodCollectVo> specimen = CollectService.getCollectbyno(specimenNo);
		return specimen;
	}

	//부적합검체 리스트
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

	@PostMapping("/insertsubmitinadequate")
	public void insertsubmitinadequate(@Valid @RequestBody SubmitInadequateDto siDto) {
		CollectService.insertSubmitInadequate(siDto);
	}

	@GetMapping("/visitbypatientno")
	public List<CollectPrescriptionOrderVo> getvisitbypatientno(@Valid @Param("patientNo") String patientNo) {
		List<CollectPrescriptionOrderVo> visitlist = CollectService.getvisitbypatientno(patientNo);
		return visitlist;
	}

	@GetMapping("/getrecobyorderno")
	public List<ReceptCollectionVo> getReceptCollectionbyorderno(@Valid @Param("orderNo") String orderNo) {
		List<ReceptCollectionVo> ReceptCollectionlist = CollectService.getReceptCollectionbyorderno(orderNo);
		return ReceptCollectionlist;
	}

	@GetMapping("/getconsultationPatientNo")
	public List<CollectPrescriptionVo> getconsultationPatientNo(@Valid @Param("patientNo") String PatientNo) {
		List<CollectPrescriptionVo> getconsultationPatientNo = CollectService.getconsultationPatientNo(PatientNo);
		return getconsultationPatientNo;
	}
	
	@GetMapping("/getPrebyOrderNo")
	public List<CollectPrescriptionVo> findPrebyOrderNo(@Valid @Param("orderNo") String orderNo) {
		List<CollectPrescriptionVo> Prescription = CollectService.getfindPrebyOrderNo(orderNo);
		return Prescription;
	}
	

}