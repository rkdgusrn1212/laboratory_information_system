package com.kanghoshin.lis.service.collect;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.kanghoshin.lis.dao.collect.CollectMapper;
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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CollectServiceImpl implements CollectService {
	private final CollectMapper collectMapper;
	private final PlatformTransactionManager transactionManager;

	@Override
	public List<StaffVo> getallstafflistall() {
		List<StaffVo> getallstafflist = collectMapper.getallstafflistall();
		return getallstafflist;
	}

	@Override
	public CollectSpecimenVo createSpecimen(SpecimenDto specimenDto) {
		TransactionStatus txStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
		CollectSpecimenVo findbyspecimenno = null;
		try {
			collectMapper.specimeninsertbsystaffno(specimenDto);

			collectMapper.insertReceptCollection(specimenDto);

		} catch (Exception e) {
			System.out.println(e);
		}
		transactionManager.commit(txStatus);
		return findbyspecimenno;
	}
	//검체 만들고 접수 하고 검체번호 받아오기
	@Override
	public String createSpecimengetno(SpecimenDto specimenDto) {

		collectMapper.specimeninsertbsystaffno(specimenDto);
		
		collectMapper.insertReceptCollection(specimenDto);
		return specimenDto.getSpecimenNo();
	}
	//검체 번호 입력 받아서 접수만 하기
	@Override
	public void createReceptCollection (SpecimenDto specimenDto) {
		collectMapper.insertReceptCollection(specimenDto);
	}
	
	

	@Override
	public List<CollectSpecimenVo> createSpecimenmulti(@Valid SpecimenDto specimenDto, @Valid int count) {
		TransactionStatus txStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
		List<CollectSpecimenVo> specimeninsertlist = new ArrayList<CollectSpecimenVo>();
		CollectSpecimenVo findbyspecimenno;
		try {
			for (int i = 0; i < count; i++) {
				collectMapper.specimeninsertbsystaffno(specimenDto);
				findbyspecimenno = collectMapper.findByspecimenno(specimenDto.getSpecimenNo());
				collectMapper.insertReceptCollection(specimenDto);
				specimeninsertlist.add(findbyspecimenno);
			}
		} catch (Exception e) {
			transactionManager.rollback(txStatus);
			System.out.println(e);
		}
		transactionManager.commit(txStatus);
		return specimeninsertlist;
	}

	@Override
	public List<CollectSpecimenVo> getSpecimenall() {
		List<CollectSpecimenVo> Specimenlist = collectMapper.listspecimenall();
		return Specimenlist;
	}

	@Override
	public CollectSpecimenVo getSpecimenbyno(String specimenNo) {
		CollectSpecimenVo Specimenbyno = collectMapper.findByspecimenno(specimenNo);
		return Specimenbyno;
	}

	@Override
	public List<InadequateTypeVo> getInadequate_typeall() {
		List<InadequateTypeVo> inadequate_typelist = collectMapper.listInadequate_typeall();
		return inadequate_typelist;
	}

	@Override
	public List<BloodCollectVo> createCollectmulti(@Valid List<BloodCollectDto> collectDtolist) {
		TransactionStatus txStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
		List<BloodCollectVo> specimeninsertlist = new ArrayList<BloodCollectVo>();
		BloodCollectVo findbyspecimenno = null;
		try {
			for (int i = 0; i < collectDtolist.size(); i++) {

				collectMapper.collectinsertbydto(collectDtolist.get(i));
				findbyspecimenno = collectMapper.findcollectByspecimenno(collectDtolist.get(i).getSpecimenNo());
				specimeninsertlist.add(findbyspecimenno);
			}
		} catch (Exception e) {
			transactionManager.rollback(txStatus);
			System.out.println(e);
		}
		transactionManager.commit(txStatus);
		return specimeninsertlist;
	}

	@Override
	public BloodCollectVo createCollect(@Valid BloodCollectDto collectDto) {
		TransactionStatus txStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
		BloodCollectVo findbyspecimenno = null;
		try {
			collectMapper.collectinsertbydto(collectDto);
			findbyspecimenno = collectMapper.findcollectByspecimenno(collectDto.getSpecimenNo());
		} catch (Exception e) {
			transactionManager.rollback(txStatus);
			System.out.println(e);
		}
		transactionManager.commit(txStatus);
		return findbyspecimenno;

	}

	@Override
	public void createCollectPost(@Valid BloodCollectDto collectDto) {
		try {
			collectMapper.collectinsertbydto(collectDto);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	// 채혈페이지에서 목록에서 사용
	@Override
	public List<BloodCollectVo> getCollectall() {
		List<BloodCollectVo> Specimenlist = new ArrayList<BloodCollectVo>();
		try {
			Specimenlist = collectMapper.listcollectall();
		} catch (Exception e) {
			System.out.println(e);
		}
		return Specimenlist;
	}

	@Override
	public BloodCollectVo getCollectbyno(String specimenNo) {
		BloodCollectVo getCollectbyno = collectMapper.findcollectByspecimenno(specimenNo);
		return getCollectbyno;
	}

	@Override
	public List<SubmitInadequateVo> getSubmitInadequatelist() {
		List<SubmitInadequateVo> Inadequatelist = collectMapper.SubmitInadequatelist();
		return Inadequatelist;
	}

	@Override
	public SubmitInadequateVo getSubmitInadequatebyno(String specimenNo) {
		SubmitInadequateVo Inadequatebyno = collectMapper.getSubmitInadequatebyno(specimenNo);
		return Inadequatebyno;
	}

	@Override
	public void insertSubmitInadequate(SubmitInadequateDto SubmitInadequateDto) {
		collectMapper.SubmitInadequatebyDto(SubmitInadequateDto);
	}

	@Override
	public List<CollectPrescriptionOrderVo> getvisitbypatientno(String patientNo) {
		List<CollectPrescriptionOrderVo> visitlist = collectMapper.findVisitByPatientNo(patientNo);
		return visitlist;
	}

	@Override
	public List<ReceptCollectionVo> getReceptCollectionbyorderno(String orderNo) {
		List<ReceptCollectionVo> rclist = collectMapper.findReceptCollectionbyorderno(orderNo);
		return rclist;
	}

	@Override
	public List<CollectPrescriptionVo> getconsultationPatientNo(String patientNo) {
		List<CollectPrescriptionVo> prelist = collectMapper.findconsultationPatientNo(patientNo);
		return prelist;
	}

	@Override
	public List<CollectPrescriptionVo> getfindPrebyOrderNo(String orderNo) {
		List<CollectPrescriptionVo> findPrebyOrderNo = collectMapper.findPrebyOrderNo(orderNo);
		return findPrebyOrderNo;
	}
}
