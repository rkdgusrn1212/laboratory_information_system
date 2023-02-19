package com.kanghoshin.lis.vo.entity;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.specimencontainer.SpecimenContainerCodeConstraints;
import com.kanghoshin.lis.constraints.specimentype.SpecimenTypeCodeConstraints;

import lombok.Getter;

@Getter
public class TestPrescriptionVo extends PrescriptionVo{

	public TestPrescriptionVo(String prescriptionCode, String behaviorCode, String prescriptionName,
			String prescriptionClassificationCode, String prescriptionSlipCode, String prescriptionComment, String specimenTypeCode, String specimenContainerCode) {
		super(prescriptionCode, behaviorCode, prescriptionName, prescriptionClassificationCode, prescriptionSlipCode,
				prescriptionComment);
		this.specimenTypeCode = specimenTypeCode;
		this.specimenContainerCode = specimenContainerCode;
	}

	@NotNull
	@SpecimenTypeCodeConstraints
	private final String specimenTypeCode;
	@NotNull
	@SpecimenContainerCodeConstraints
	private final String specimenContainerCode;
}
