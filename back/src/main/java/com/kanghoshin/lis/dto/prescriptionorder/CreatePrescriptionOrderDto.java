package com.kanghoshin.lis.dto.prescriptionorder;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionCodeConstraints;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatePrescriptionOrderDto {
	
	private int prescriptionOrderNo;
	
	@NoConstraints
	private int consultationNo;
	@PrescriptionCodeConstraints
	private String prescriptionCode;
}
