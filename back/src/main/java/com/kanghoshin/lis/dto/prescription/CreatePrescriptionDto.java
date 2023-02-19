package com.kanghoshin.lis.dto.prescription;

import javax.validation.constraints.NotBlank;

import com.kanghoshin.lis.constraints.behavior.BehaviorCodeConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionCodeConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionCommentConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionNameConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionSlipCodeConstraints;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatePrescriptionDto {
	@NotBlank
	@PrescriptionCodeConstraints
	private String prescriptionCode;
	
	@BehaviorCodeConstraints
	private String behaviorCode;
	
	@NotBlank
	@PrescriptionNameConstraints
	private String prescriptionName;
	
	@PrescriptionSlipCodeConstraints
	private String prescriptionSlipCode;
	
	@PrescriptionCommentConstraints
	private String prescriptionComment;

}
