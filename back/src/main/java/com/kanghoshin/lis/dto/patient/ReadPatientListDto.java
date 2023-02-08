package com.kanghoshin.lis.dto.patient;

import java.util.Date;

import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ReadPatientListDto extends ReadListDto {
	
	private int patientNoStart;
	private int patientNoEnd;
	private String patientNoKey;
	
	private String patientNameStart;
	private String patientNameKey;
	private String patientNameEnd;
	
	private boolean excludePatientMale;
	private boolean excludePatientFemale;

	private String patientPhoneStart;
	private String patientPhoneKey;
	private String patientPhoneEnd;
	
	private String patientRrnStart;
	private String patientRrnEnd;
	private String patientRrnKey;
	
	private Date patientBirthStart;
	private Date patientBirthEnd;
	private Date patientBirthKey;
}
