package com.kanghoshin.lis.dto.consultationreception;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.constraints.NoConstraints;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CreateConsultationAppointmentDto {

	@NoConstraints
	private int staffNo;
	@NoConstraints
	private int patientNo;
	@NotNull
	private Date consultationReceptionAppointment;
}
