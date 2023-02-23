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

	List<CollectSpecimenVo> createSpecimenmulti(@Valid SpecimenDto specimenDto, @Valid int count);

	CollectSpecimenVo createSpecimen(@Valid SpecimenDto specimenDto);

	
	String createSpecimengetno(SpecimenDto specimenDto);

	List<CollectSpecimenVo> getSpecimenall();

	CollectSpecimenVo getSpecimenbyno(String specimenNo);
	void createReceptCollection (SpecimenDto specimenDto);
	
	List<InadequateTypeVo> getInadequate_typeall();

	List<BloodCollectVo> createCollectmulti(@Valid List<BloodCollectDto> collectDtolist);

	BloodCollectVo createCollect(@Valid BloodCollectDto collectDto);

	void createCollectPost(@Valid BloodCollectDto collectDto);

	List<BloodCollectVo> getCollectall();

	BloodCollectVo getCollectbyno(String specimenNo);

	List<SubmitInadequateVo> getSubmitInadequatelist();

	SubmitInadequateVo getSubmitInadequatebyno(String specimenNo);

	void insertSubmitInadequate(SubmitInadequateDto SubmitInadequateDto);

	List<CollectPrescriptionOrderVo> getvisitbypatientno(String patientNo);

	List<ReceptCollectionVo> getReceptCollectionbyorderno(String orderNo);

	List<CollectPrescriptionVo> getconsultationPatientNo(String patientNo);

	List<CollectPrescriptionVo> getfindPrebyOrderNo(String orderNo);
}
