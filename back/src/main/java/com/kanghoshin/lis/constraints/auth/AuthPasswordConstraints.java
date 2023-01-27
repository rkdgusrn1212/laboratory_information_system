package com.kanghoshin.lis.constraints.auth;

import javax.validation.constraints.Pattern;

@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&^])[A-Za-z0-9@$!%*#?&^]{9,40}$", message = 
		"영문, 숫자, 특수문자가 각각 하나이상 포함된 9자 이상 40자 이하의 문자열")
public @interface AuthPasswordConstraints {
}
