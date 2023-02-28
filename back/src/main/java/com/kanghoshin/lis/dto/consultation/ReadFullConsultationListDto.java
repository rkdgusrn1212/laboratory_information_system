package com.kanghoshin.lis.dto.consultation;

import java.util.Date;

import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class ReadFullConsultationListDto extends ReadListDto{
	

	private String consultationNoKey;
	@OrderConstraints
	private String consultationNoOrder;
	
	private Date consultationTimeStart;
	private Date consultationTimeEnd;
	@OrderConstraints
	private String consultationTimeOrder;

	private String consultationReceptionNoKey;
	@OrderConstraints
	private String consultationReceptionNoOrder;
	
	private Date consultationReceptionTimeStart;
	private Date consultationReceptionTimeEnd;
	@OrderConstraints
	private String consultationReceptionTimeOrder;

	private String staffNoKey;
	@OrderConstraints
	private String staffNoOrder;
	
	private int patientNo;
	
	private String patientNoKey;
	@OrderConstraints
	private String patientNoOrder;

	private Date consultationReceptionAppointmentStart;
	private Date consultationReceptionAppointmentEnd;
	@OrderConstraints
	private String consultationReceptionAppointmentOrder;
}