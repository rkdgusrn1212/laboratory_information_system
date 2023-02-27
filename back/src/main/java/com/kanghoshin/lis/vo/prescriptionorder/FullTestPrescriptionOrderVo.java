package com.kanghoshin.lis.vo.prescriptionorder;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionCodeConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionCommentConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionNameConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionSlipCodeConstraints;
import com.kanghoshin.lis.constraints.prescriptionclassification.PrescriptionClassificationCodeConstraints;
import com.kanghoshin.lis.constraints.specimencontainer.SpecimenContainerCodeConstraints;
import com.kanghoshin.lis.constraints.specimentype.SpecimenTypeCodeConstraints;
import com.kanghoshin.lis.vo.consultation.FullConsultationVo;

import lombok.Getter;

@Getter
public class FullTestPrescriptionOrderVo extends FullConsultationVo{

	public FullTestPrescriptionOrderVo(int prescriptionOrderNo, String prescriptionCode,Date prescriptionOrderTime, 
			String specimenTypeCode, String specimenContainerCode, 
			int testPrescriptionAmount, String testPrescriptionUnit, String testPrescriptionReference, String testFieldCode, 
			String prescriptionName,
			String prescriptionClassificationCode,String prescriptionSlipCode, 
			String prescriptionComment, int consultationNo, @NotNull Date consultationTime, int consultationReceptionNo,
			@NotNull Date consultationReceptionTime, int staffNo, int patientNo,
			Date consultationReceptionAppointment) {
		super(consultationNo, consultationTime, consultationReceptionNo, consultationReceptionTime, staffNo, patientNo,
				consultationReceptionAppointment);
		this.prescriptionOrderNo = prescriptionOrderNo;
		this.prescriptionCode = prescriptionCode;
		this.prescriptionOrderTime = prescriptionOrderTime;
		this.specimenTypeCode = specimenTypeCode;
		this.specimenContainerCode = specimenContainerCode;
		this.testPrescriptionAmount = testPrescriptionAmount;
		this.testPrescriptionUnit = testPrescriptionUnit;
		this.testPrescriptionReference = testPrescriptionReference;
		this.testFieldCode = testFieldCode;
		this.prescriptionName = prescriptionName;
		this.prescriptionClassificationCode = prescriptionClassificationCode;
		this.prescriptionSlipCode = prescriptionSlipCode;
		this.prescriptionComment = prescriptionComment;
	}

	@NoConstraints
	private final int prescriptionOrderNo;

	@NotBlank
	@PrescriptionCodeConstraints
	private final String prescriptionCode;

	@NotNull
	private final Date prescriptionOrderTime;

	@NotBlank
	@SpecimenTypeCodeConstraints
	private final String specimenTypeCode;
	
	@NotBlank
	@SpecimenContainerCodeConstraints
	private final String specimenContainerCode;

	private final int testPrescriptionAmount;
	private final String testPrescriptionUnit;
	private final String testPrescriptionReference;
	private final String testFieldCode;

	@NotBlank
	@PrescriptionNameConstraints
	private final String prescriptionName;

	@NotBlank
	@PrescriptionClassificationCodeConstraints
	private final String prescriptionClassificationCode;

	@PrescriptionSlipCodeConstraints
	private final String prescriptionSlipCode;

	@PrescriptionCommentConstraints
	private final String prescriptionComment;
}