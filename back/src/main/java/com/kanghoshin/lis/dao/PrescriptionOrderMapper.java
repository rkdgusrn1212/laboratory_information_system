package com.kanghoshin.lis.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.kanghoshin.lis.dto.prescriptionorder.CreatePrescriptionOrderDto;
import com.kanghoshin.lis.vo.prescriptionorder.FullTestPrescriptionOrderVo;

@Mapper
public interface PrescriptionOrderMapper {

	@Insert("<script> "
			+ "INSERT INTO prescription_order VALUES "
			+ "<foreach collection='createPrescriptionOrderDto' item='item' separator=', '> "
			+ "( "
			+ "null, "
			+ "#{item.consultationNo}, "
			+ "#{item.prescriptionCode}, "
			+ "null "
			+ ") "
			+ "</foreach>"
			+ "</script>")
	int insertList(@Param("createPrescriptionOrderDto")CreatePrescriptionOrderDto[] createPrescriptionOrderDto);
	
	@Select("<script></script>")
	FullTestPrescriptionOrderVo selectFullTestPrescriptionOrder();
}
