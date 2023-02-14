package com.kanghoshin.lis.dto.patient;

import java.util.Date;

import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ReadPatientListDto extends ReadListDto {
	
	private String patientNoKey;
	@OrderConstraints
	private String patientNoOrder;
	private String patientNameKey;
	@OrderConstraints
	private String patientNameOrder;
	private String patientMaleKey;
	@OrderConstraints
	private String patientMaleOrder;
	private String patientPhoneKey;
	@OrderConstraints
	private String patientPhoneOrder;
	private String patientRrnKey;
	@OrderConstraints
	private String patientRrnOrder;
	private Date patientBirthStart;
	private Date patientBirthEnd;
	@OrderConstraints
	private String patientBirthOrder;
}
