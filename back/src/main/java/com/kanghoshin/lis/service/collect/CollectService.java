package com.kanghoshin.lis.service.collect;

import java.util.List;

import javax.validation.Valid;

import org.springframework.validation.annotation.Validated;

import com.kanghoshin.lis.dto.collect.BloodCollectDto;
import com.kanghoshin.lis.dto.collect.SpecimenDto;
import com.kanghoshin.lis.dto.collect.SubmitInadequateDto;
import com.kanghoshin.lis.vo.collect.BloodCollectVo;
import com.kanghoshin.lis.vo.collect.CollectPatientVo;
import com.kanghoshin.lis.vo.collect.CollectSpecimenVo;
import com.kanghoshin.lis.vo.collect.InadequateTypeVo;
import com.kanghoshin.lis.vo.collect.SubmitInadequateVo;
import com.kanghoshin.lis.vo.entity.StaffVo;

@Validated
public interface CollectService {
	// 삭제예정
	List<CollectPatientVo> getPatientall();

	List<CollectPatientVo> getPatientbyname(String patient_name);
	//

	List<StaffVo> getallstafflistall();

	List<CollectSpecimenVo> createSpecimenmulti(@Valid SpecimenDto specimenDto, @Valid int count);

	CollectSpecimenVo createSpecimen(@Valid SpecimenDto specimenDto);

	List<CollectSpecimenVo> getSpecimenall();

	List<InadequateTypeVo> getInadequate_typeall();

	List<BloodCollectVo> createCollectmulti(@Valid List<BloodCollectDto> collectDtolist);

	BloodCollectVo createCollect(@Valid BloodCollectDto collectDto);

	void createCollectPost(@Valid BloodCollectDto collectDto);

	List<BloodCollectVo> getCollectall();

	BloodCollectVo getCollectbyno(String specimenNo);

	List<SubmitInadequateVo> getSubmitInadequatelist();

	SubmitInadequateVo getSubmitInadequatebyno(String specimenNo);

	void insertSubmitInadequate(SubmitInadequateDto SubmitInadequateDto);
}