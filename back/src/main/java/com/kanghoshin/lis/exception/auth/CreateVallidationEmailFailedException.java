package com.kanghoshin.lis.exception.auth;

import com.kanghoshin.lis.vo.error.auth.CreateValidationEmailErrorVo;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateVallidationEmailFailedException extends Exception {

	private static final long serialVersionUID = -7453112603781541892L;
	private CreateValidationEmailErrorVo createValidationEmailErrorVo;
}
