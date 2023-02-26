package com.kanghoshin.lis.vo.consultationreception;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.vo.entity.ConsultationReceptionVo;

import lombok.Getter;

@Getter
public class ConsultationAppointmentVo extends ConsultationReceptionVo{
	public ConsultationAppointmentVo(int consultationReceptionNo, @NotNull Date consultationReceptionTime, int StaffNo,
			int patientNo, @NotNull Date consultationReceptionAppointment) {
		super(consultationReceptionNo, consultationReceptionTime, StaffNo, patientNo,
				consultationReceptionAppointment);
	}
}
