package com.kanghoshin.lis.vo.consultationreception;

import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.kanghoshin.lis.vo.entity.ConsultationReceptionVo;

import lombok.Getter;

@Getter
public class ConsultationWalkInVo extends ConsultationReceptionVo{
	public ConsultationWalkInVo(int consultationReceptionNo, @NotNull Date consultationReceptionTime, int StaffNo,
			int patientNo, Date consultationReceptionAppointment, int consultationWalkInOrder, Date consultationTime) {
		super(consultationReceptionNo, consultationReceptionTime, StaffNo, patientNo,
				consultationReceptionAppointment);
		this.consultationWalkInOrder = consultationWalkInOrder;
		this.consultationTime = consultationTime;
	}

	@Min(value=1,message="순번은 1보다 커야합니다.")
	private final int consultationWalkInOrder;
	
	private final Date consultationTime;
}
