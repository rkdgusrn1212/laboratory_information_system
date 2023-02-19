package com.kanghoshin.lis.dto.prescriptionorder;

import java.util.Date;

import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.dto.consultation.ReadFullConsultationListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class ReadFullTestPrescriptionOrderListDto extends ReadFullConsultationListDto{

	private String prescriptionOrderNoKey;
	@OrderConstraints
	private String prescriptionOrderNoOrder;

	private String prescriptionCodeKey;
	@OrderConstraints
	private String prescriptionCodeOrder;

	private Date prescriptionOrderTimeStart;
	private Date prescriptionOrderTimeEnd;
	@OrderConstraints
	private String prescriptionOrderTimeOrder;

	private String specimenContainerCodeKey;
	@OrderConstraints
	private String specimenContainerCodeOrder;

	private String specimenTypeCodeKey;
	@OrderConstraints
	private String specimenTypeCodeOrder;

	private String prescriptionNameKey;
	@OrderConstraints
	private String prescriptionNameOrder;

	private String prescriptionClassificationCodeKey;
	@OrderConstraints
	private String prescriptionClassificationCodeOrder;

	private String prescriptionSlipCodeKey;
	@OrderConstraints
	private String prescriptionSlipCodeOrder;

	private String prescriptionCommentKey;
	@OrderConstraints
	private String prescriptionCommentOrder;
}
