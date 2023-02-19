package com.kanghoshin.lis.vo.consultation;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.NoConstraints;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FullConsultationVo {
	
	@NoConstraints
	private final int consultationNo;

	@NotNull
	private final Date consultationTime;
	
	@NoConstraints
	private final int consultationReceptionNo;
	
	@NotNull
	private final Date consultationReceptionTime;
	
	@NoConstraints
	private final int staffNo;
	
	@NoConstraints
	private final int patientNo;
	
	private final Date consultationReceptionAppointment;
}
