package com.kanghoshin.lis.vo.entity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DepartmentVo {
	
	@NotBlank(message = "진료과 코드가 비어있습니다.")
	@Pattern(regexp = "^[0-9]{2}$", message = "진료과 코드 형식이 맞지 않습니다.")
	String departmentCode;
	
	@NotBlank(message = "진료과 이름이 비어있습니다.")
	String departmentName;
}
