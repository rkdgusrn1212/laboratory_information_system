package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.prescription.CreatePrescriptionDto;
import com.kanghoshin.lis.dto.prescription.ReadPrescriptionListDto;
import com.kanghoshin.lis.vo.entity.PrescriptionVo;

@Mapper
public interface PrescriptionMapper {
	
	@Insert("INSERT INTO prescription VALUES( "
			+ "#{createPrescriptionDto.prescriptionCode}, "
			+ "#{createPrescriptionDto.behaviorCode}, "
			+ "#{createPrescriptionDto.prescriptionName}, "
			+ "null, "
			+ "#{createPrescriptionDto.prescriptionSlipCode}, "
			+ "#{createPrescriptionDto.prescriptionComment})")
	int createPrescription(@Param("createPrescriptionDto")CreatePrescriptionDto createPrescriptionDto);
	
	
	@Select("<script>"
			+ "SELECT * FROM prescription "
			+ "<where> "
			+ "<if test='readPrescriptionListDto.prescriptionCodeKey != null'> "
			+ "prescription_code like CONCAT('%',#{readPrescriptionListDto.prescriptionCodeKey},'%') "
			+ "</if> "
			+ "<if test='readPrescriptionListDto.prescriptionNameKey != null'> "
			+ "AND prescription_name like CONCAT('%',#{readPrescriptionListDto.prescriptionNameKey},'%') "
			+ "</if> "
			+ "<if test='readPrescriptionListDto.prescriptionClassificationCodeKey != null'> "
			+ "AND prescription_classification_code like CONCAT('%',#{readPrescriptionListDto.prescriptionClassificationCodeKey},'%') "
			+ "</if> "
			+ "<if test='readPrescriptionListDto.prescriptionSlipCodeKey != null'> "
			+ "AND prescription_slip_code like CONCAT('%',#{readPrescriptionListDto.prescriptionSlipCodeKey},'%') "
			+ "</if> "
			+ "<if test='readPrescriptionListDto.prescriptionCommentKey != null'> "
			+ "AND prescription_comment like CONCAT('%',#{readPrescriptionListDto.prescriptionCommentKey},'%') "
			+ "</if> "
			+ "</where> "
			+ "<trim prefix='ORDER BY' prefixOverrides=','> "
			+ "<if test='readPrescriptionListDto.prescriptionCodeOrder != null'> "
			+ " prescription_code ${readPrescriptionListDto.prescriptionCodeOrder} "
			+ "</if> "
			+ "<if test='readPrescriptionListDto.prescriptionNameOrder != null'> "
			+ ", prescription_name ${readPrescriptionListDto.prescriptionNameOrder} "
			+ "</if> "
			+ "<if test='readPrescriptionListDto.prescriptionClassificationCodeOrder != null'> "
			+ ", prescription_classification_code ${readPrescriptionListDto.prescriptionClassificationCodeOrder} "
			+ "</if> "
			+ "<if test='readPrescriptionListDto.prescriptionSlipCodeOrder != null'> "
			+ ", prescription_slip_code ${readPrescriptionListDto.prescriptionSlipCodeOrder} "
			+ "</if> "
			+ "<if test='readPrescriptionListDto.prescriptionCommentOrder != null'> "
			+ ", prescription_comment ${readPrescriptionListDto.prescriptionCommentOrder} "
			+ "</if> "
			+ "</trim> "
			+ "limit #{readPrescriptionListDto.pageStart}, #{readPrescriptionListDto.pageSize} "
			+ "</script>")
	PrescriptionVo[] select(@Param("readPrescriptionListDto") ReadPrescriptionListDto readPrescriptionListDto);
	
	@Select("SELECT COUNT(*) FROM prescription")
	int count();
}
