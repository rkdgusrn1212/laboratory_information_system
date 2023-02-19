package com.kanghoshin.lis.dto.testprescription;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.prescription.PrescriptionCodeConstraints;
import com.kanghoshin.lis.constraints.specimencontainer.SpecimenContainerCodeConstraints;
import com.kanghoshin.lis.constraints.specimentype.SpecimenTypeCodeConstraints;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateTestPrescriptionDto {

	@NotNull
	@PrescriptionCodeConstraints
	private String prescriptionCode;
	
	@NotNull
	@SpecimenTypeCodeConstraints
	private String specimenTypeCode;

	@NotNull
	@SpecimenContainerCodeConstraints
	private String specimenContainerCode;
}
