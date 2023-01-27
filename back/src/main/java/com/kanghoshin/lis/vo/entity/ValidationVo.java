package com.kanghoshin.lis.vo.entity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.kanghoshin.lis.constraints.ValidationEmailConstraints;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidationVo {
	@NotNull(message="이메일이 비어있음")
	@ValidationEmailConstraints
	private String email;

	@Size(min=60, max=60)
	private String code;
	
	@NotBlank
	@Size(min = 1, max = 40)
	private String authId;
	
	
	public boolean isValidated() {
		return code==null;
	}
}
