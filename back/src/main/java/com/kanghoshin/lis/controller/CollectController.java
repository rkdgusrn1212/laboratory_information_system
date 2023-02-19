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
import com.kanghoshin.lis.vo.collect.CollectPrescriptionVo;
import com.kanghoshin.lis.vo.collect.CollectSpecimenVo;
import com.kanghoshin.lis.vo.collect.CollectVisitVo;
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

	@GetMapping("/specimenbyno")
	public CollectSpecimenVo specimenbyno(@Valid @Param("specimenNo") String specimenNo) {
		CollectSpecimenVo specimen = CollectService.getSpecimenbyno(specimenNo);
		return specimen;
	}

	@GetMapping("/inadequate_typeList")
	public List<InadequateTypeVo> inadequate_typeall() {
		List<InadequateTypeVo> inadequate_typelist = CollectService.getInadequate_typeall();
		return inadequate_typelist;
	}

	@GetMapping("/insertcollect")
	public BloodCollectVo insertcollect(@Valid @Param("specimenNo") String specimenNo,
			@Param("staffNo") String staffNo) {
		BloodCollectDto CollectDto = new BloodCollectDto();
		CollectDto.setStaffNo(staffNo);
		CollectDto.setSpecimenNo(specimenNo);

		BloodCollectVo createspecimen = CollectService.createCollect(CollectDto);
		return createspecimen;
	}

	@PostMapping("/insertcollectbypost")
	public void insertcollectbypost(@Valid @RequestBody BloodCollectDto CollectDTO) {
		System.out.println(CollectDTO);
		CollectService.createCollectPost(CollectDTO);
	}

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

	@PostMapping("/insertsubmitinadequate")
	public void insertsubmitinadequate(@Valid @RequestBody SubmitInadequateDto siDto) {
		CollectService.insertSubmitInadequate(siDto);
	}

	@GetMapping("/visitbypatientno")
	public List<CollectVisitVo> getvisitbypatientno(@Valid @Param("patientNo") String patientNo) {
		List<CollectVisitVo> visitlist = CollectService.getvisitbypatientno(patientNo);
		return visitlist;
	}

	@GetMapping("/getrecobyorderno")
	public List<ReceptCollectionVo> getReceptCollectionbyorderno(@Valid @Param("orderNo") String orderNo) {
		List<ReceptCollectionVo> ReceptCollectionlist = CollectService.getReceptCollectionbyorderno(orderNo);
		return ReceptCollectionlist;
	}

	@GetMapping("/getprebypatientno")
	public List<CollectPrescriptionVo> getPrebyPatientNo(@Valid @Param("patientNo") String PatientNo) {
		List<CollectPrescriptionVo> Prescriptionlist = CollectService.getPrebyPatientNo(PatientNo);
		return Prescriptionlist;
	}
	
	@GetMapping("/getPrebyOrderNo")
	public List<CollectPrescriptionVo> findPrebyOrderNo(@Valid @Param("orderNo") String orderNo) {
		List<CollectPrescriptionVo> Prescription = CollectService.getfindPrebyOrderNo(orderNo);
		return Prescription;
	}
	

}