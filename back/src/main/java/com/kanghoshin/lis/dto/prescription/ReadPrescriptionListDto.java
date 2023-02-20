package com.kanghoshin.lis.dto.prescription;

import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class ReadPrescriptionListDto extends ReadListDto {

	private String prescriptionCodeKey;
	@OrderConstraints
	private String prescriptionCodeOrder;

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
