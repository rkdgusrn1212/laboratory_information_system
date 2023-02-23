package com.kanghoshin.lis.service;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.kanghoshin.lis.dao.ConsultationMapper;
import com.kanghoshin.lis.dto.consultation.CreateConsultationDto;
import com.kanghoshin.lis.dto.consultation.ReadFullConsultationListDto;
import com.kanghoshin.lis.exception.GeneralErrorWithMessageException;
import com.kanghoshin.lis.vo.consultation.FullConsultationVo;
import com.kanghoshin.lis.vo.entity.ConsultationVo;
import com.kanghoshin.lis.vo.error.GeneralErrorWithMessageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConsultationServiceImpl implements ConsultationService {

	private final ConsultationMapper consultationMapper;
	private final PlatformTransactionManager transactionManager;
	private final GeneralErrorWithMessageVo createConsultationError = new GeneralErrorWithMessageVo("createConsultation", "알수없는 애러 발생", "UNKNOWN");

	@Override
	public FullConsultationVo[] readFullConsultationList(
			@Valid ReadFullConsultationListDto readFullConsultationListDto) {
		return consultationMapper.selectFullConsultation(readFullConsultationListDto);
	}

	@Override
	public ConsultationVo createConsultation(@NotNull @Valid CreateConsultationDto createConsultationDto) throws GeneralErrorWithMessageException {
		TransactionStatus txStatus =
				transactionManager.getTransaction(new DefaultTransactionDefinition());
		ConsultationVo result = null;
		try {
			consultationMapper.insert(createConsultationDto);
			result = consultationMapper.findByConsultationVo(createConsultationDto.getConsultationNo());
		}catch(Exception e) {
			transactionManager.rollback(txStatus);
			throw new GeneralErrorWithMessageException(createConsultationError);
		}
		if(result == null) {
			transactionManager.rollback(txStatus);
			throw new GeneralErrorWithMessageException(createConsultationError);
		}
		transactionManager.commit(txStatus);
		return result;
	}
}
