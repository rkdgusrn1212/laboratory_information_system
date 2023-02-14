package com.kanghoshin.lis.dto.staff;

import java.util.Date;

import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ReadStaffListDto extends ReadListDto {
	
	private String staffNoKey;
	@OrderConstraints
	private String staffNoOrder;
	
	private String staffNameKey;
	@OrderConstraints
	private String staffNameOrder;
	
	private Date staffBirthStart;
	private Date staffBirthEnd;
	@OrderConstraints
	private String staffBirthOrder;
	
	private String staffMaleKey;
	@OrderConstraints
	private String staffMaleOrder;
	
	private String staffPhoneKey;
	@OrderConstraints
	private String staffPhoneOrder;
	
	private String staffRrnKey;
	@OrderConstraints
	private String staffRrnOrder;

	private String staffAdmittedKey;
	@OrderConstraints
	private String staffAdmittedOrder;

	private String staffTypeKey;
	@OrderConstraints
	private String staffTypeOrder;
}
