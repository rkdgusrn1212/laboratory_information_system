package com.kanghoshin.lis.service.collect;

import java.util.List;

import javax.validation.Valid;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.collect.BloodCollectDto;
import com.kanghoshin.lis.dto.collect.SpecimenDto;
import com.kanghoshin.lis.dto.collect.SubmitInadequateDto;
import com.kanghoshin.lis.vo.collect.BloodCollectVo;
import com.kanghoshin.lis.vo.collect.CollectPrescriptionVo;
import com.kanghoshin.lis.vo.collect.CollectSpecimenVo;
import com.kanghoshin.lis.vo.collect.CollectPrescriptionOrderVo;
import com.kanghoshin.lis.vo.collect.InadequateTypeVo;
import com.kanghoshin.lis.vo.collect.ReceptCollectionVo;
import com.kanghoshin.lis.vo.collect.SubmitInadequateVo;
import com.kanghoshin.lis.vo.entity.StaffVo;

@Validated
public interface CollectService {

	List<StaffVo> getallstafflistall();


	CollectSpecimenVo createSpecimen(@Valid SpecimenDto specimenDto);

	String createSpecimengetno(SpecimenDto specimenDto);

	String createSpecimenRCgetno(SpecimenDto specimenDto);

	List<CollectSpecimenVo> getSpecimenall();

	List<CollectSpecimenVo> getSpecimenbyno(String specimenNo);

	void createReceptCollection(SpecimenDto specimenDto);

	void createSpecimenRCgetno2(List<SpecimenDto> list);

	List<SpecimenDto> createSpecimenRCgetno3(List<SpecimenDto> list);
	
	
	List<InadequateTypeVo> getInadequate_typeall();

	List<BloodCollectVo> createCollectmulti(@Valid List<BloodCollectDto> collectDtolist);

	List<BloodCollectVo> createCollect(@Valid BloodCollectDto collectDto);

	void createCollectPost(@Valid BloodCollectDto collectDto);

	List<BloodCollectVo> getCollectall();

	List<BloodCollectVo> getCollectbyno(String specimenNo);

	List<SubmitInadequateVo> getSubmitInadequatelist();

	SubmitInadequateVo getSubmitInadequatebyno(String specimenNo);

	void insertSubmitInadequate(SubmitInadequateDto SubmitInadequateDto);

	List<CollectPrescriptionOrderVo> getvisitbypatientno(String patientNo);

	List<ReceptCollectionVo> getReceptCollectionbyorderno(String orderNo);

	List<CollectPrescriptionVo> getconsultationPatientNo(String patientNo);

	List<CollectPrescriptionVo> getfindPrebyOrderNo(String orderNo);
}
