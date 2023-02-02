package com.kanghoshin.lis.vo.entity;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.kanghoshin.lis.constraints.validation.ValidationEmailConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidationVo {
	@NotNull(message="이메일이 비어있음")
	@ValidationEmailConstraints
	private String validationEmail;

	@Size(min=60, max=60)
	private String validationCode;
	
	public boolean isValidated() {
		return validationCode==null;
	}
}
