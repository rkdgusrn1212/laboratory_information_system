package com.kanghoshin.lis.dto.department;

import javax.validation.constraints.Pattern;

import com.kanghoshin.lis.constraints.NameConstraints;
import com.kanghoshin.lis.constraints.department.DepartmentCodeConstraints;
import com.kanghoshin.lis.dto.ReadListDto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class ReadDepartmentDto extends ReadListDto{
	
	@DepartmentCodeConstraints
	String departmentCodeKey;
	@NameConstraints
	String departmentNameKey;
	@Pattern(regexp = "(ASC)|(DESC)", message="진료과 코드 정렬 인자값이 형식에 맞지 않습니다.")
	String departmentCodeOrder;
	@Pattern(regexp = "(ASC)|(DESC)", message="진료과 이름 정렬 인자값이 형식에 맞지 않습니다.")
	String departmentNameOrder;
}
