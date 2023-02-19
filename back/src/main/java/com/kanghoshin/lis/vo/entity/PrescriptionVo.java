package com.kanghoshin.lis.vo.entity;

import javax.validation.constraints.NotBlank;

import com.kanghoshin.lis.constraints.behavior.BehaviorCodeConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionCodeConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionCommentConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionNameConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionSlipCodeConstraints;
import com.kanghoshin.lis.constraints.prescriptionclassification.PrescriptionClassificationCodeConstraints;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PrescriptionVo {

	@NotBlank
	@PrescriptionCodeConstraints
	private final String prescriptionCode;
	
	@BehaviorCodeConstraints
	private final String behaviorCode;
	
	@NotBlank
	@PrescriptionNameConstraints
	private final String prescriptionName;
	
	@PrescriptionClassificationCodeConstraints
	private final String prescriptionClassificationCode;
	
	@PrescriptionSlipCodeConstraints
	private final String prescriptionSlipCode;
	
	@PrescriptionCommentConstraints
	private final String prescriptionComment;
	
}
