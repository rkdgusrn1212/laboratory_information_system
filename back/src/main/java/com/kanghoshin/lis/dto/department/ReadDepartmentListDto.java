package com.kanghoshin.lis.dto.department;

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
public class ReadDepartmentListDto extends ReadListDto{

	@DepartmentCodeConstraints
	String departmentCodeKey;
	@NameConstraints
	String departmentNameKey;
	@OrderConstraints
	String departmentCodeOrder;
	@OrderConstraints
	String departmentNameOrder;
}
