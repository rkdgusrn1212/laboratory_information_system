package com.kanghoshin.lis.dto.testprescription;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.prescription.PrescriptionCodeConstraints;
import com.kanghoshin.lis.constraints.specimencontainer.SpecimenContainerCodeConstraints;
import com.kanghoshin.lis.constraints.specimentype.SpecimenTypeCodeConstraints;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateTestPrescriptionDto {

	@NotNull
	@PrescriptionCodeConstraints
	private String prescriptionCode;
	
	@SpecimenTypeCodeConstraints
	private String specimenTypeCode;

	@SpecimenContainerCodeConstraints
	private String specimenContainerCode;
	
	private int testPrescriptionAmount;
	
	private String testPrescriptionUnit;
	
	private String testPrescriptionReference;
	
	private String testFieldCode;
}
