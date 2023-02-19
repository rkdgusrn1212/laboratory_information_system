package com.kanghoshin.lis.vo.entity;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.NoConstraints;
import com.kanghoshin.lis.constraints.prescription.PrescriptionCodeConstraints;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PrescriptionOrderVo {
	
	@NoConstraints
	private final int prescriptionOrderNo;
	@NoConstraints
	private final int consultationNo;
	@PrescriptionCodeConstraints
	private final String prescriptionCode;
	@NotNull
	private final Date prescriptionOrderTime;
}
