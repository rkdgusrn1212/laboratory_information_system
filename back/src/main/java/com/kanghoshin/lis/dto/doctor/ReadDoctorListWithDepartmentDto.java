package com.kanghoshin.lis.dto.doctor;

import com.kanghoshin.lis.constraints.NameConstraints;
import com.kanghoshin.lis.constraints.OrderConstraints;
import com.kanghoshin.lis.constraints.department.DepartmentCodeConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class ReadDoctorListWithDepartmentDto extends ReadListDto{
	
	@DepartmentCodeConstraints
	private String departmentCodeKey;
	
	@OrderConstraints
	private String departmentCodeOrder;
	
	@NameConstraints
	private String departmentNameKey;
	
	@OrderConstraints
	private String departmentNameOrder;
	
	@NameConstraints
	private String staffNameKey;
	
	@OrderConstraints
	private String staffNameOrder;
}
