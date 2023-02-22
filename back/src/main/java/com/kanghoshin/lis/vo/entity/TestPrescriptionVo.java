package com.kanghoshin.lis.vo.entity;

import com.kanghoshin.lis.constraints.specimencontainer.SpecimenContainerCodeConstraints;
import com.kanghoshin.lis.constraints.specimentype.SpecimenTypeCodeConstraints;

import lombok.Getter;

@Getter
public class TestPrescriptionVo extends PrescriptionVo{

	public TestPrescriptionVo(String prescriptionCode, String behaviorCode, String prescriptionName,
			String prescriptionClassificationCode, String prescriptionSlipCode, String prescriptionComment, String specimenTypeCode, String specimenContainerCode,
			int testPrescriptionAmount, String testPrescriptionUnit, String testPrescriptionReference,
			String testFieldCode) {
		super(prescriptionCode, behaviorCode, prescriptionName, prescriptionClassificationCode, prescriptionSlipCode,
				prescriptionComment);
		this.specimenTypeCode = specimenTypeCode;
		this.specimenContainerCode = specimenContainerCode;
		this.testPrescriptionAmount = testPrescriptionAmount;
		this.testPrescriptionUnit = testPrescriptionUnit;
		this.testPrescriptionReference = testPrescriptionReference;
		this.testFieldCode = testFieldCode;
	}

	@SpecimenTypeCodeConstraints
	private final String specimenTypeCode;
	
	@SpecimenContainerCodeConstraints
	private final String specimenContainerCode;
	
	private final int testPrescriptionAmount;
	
	private final String testPrescriptionUnit;
	
	private final String testPrescriptionReference;
	
	private final String testFieldCode;
}