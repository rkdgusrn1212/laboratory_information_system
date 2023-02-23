package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.kanghoshin.lis.dao.PrescriptionMapper;
import com.kanghoshin.lis.dto.prescription.CreatePrescriptionDto;
import com.kanghoshin.lis.dto.prescription.ReadPrescriptionListDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.vo.entity.PrescriptionVo;
import com.kanghoshin.lis.vo.error.GeneralErrorWithMessageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrescriptionServiceImpl implements PrescriptionService{
	
	private final PrescriptionMapper prescriptionMapper;
	private GeneralErrorWithMessageVo createPrescriptionDuplicatedError =  new GeneralErrorWithMessageVo("createPrescription","처방코드가 중복되었습니다.", "DUPLICATED");
	
	@Override
	public void createPrescription(@NotNull @Valid CreatePrescriptionDto createCreatePrescriptionDto) throws GeneralErrorWithMessageException {
		try {
		prescriptionMapper.createPrescription(createCreatePrescriptionDto);
		}catch(DuplicateKeyException e) {
			throw new GeneralErrorWithMessageException(createPrescriptionDuplicatedError);
		}
	}

	@Override
	public PrescriptionVo[] readPrescriptionList(@Valid ReadPrescriptionListDto readPrescriptionListDto) {
		return prescriptionMapper.select(readPrescriptionListDto);
	}
	@Override
	public int count() {
		return prescriptionMapper.count();
	}

}
