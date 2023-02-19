package com.kanghoshin.lis.dto.prescriptionorder;

import java.util.Date;

import com.kanghoshin.lis.constraints.OrderConstraints;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReadFullTestPrescriptionOrderList {

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

	private String prescriptionTypeCodeKey;
	@OrderConstraints
	private String prescriptionTypeCodeOrder;

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
