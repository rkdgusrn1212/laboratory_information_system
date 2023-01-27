package com.kanghoshin.lis.constraints.staff;

import javax.validation.constraints.Pattern;

@Pattern(regexp="^[0-9]{6}-[0-9]{7}$", message="주민번호 양식이 맞지 않습니다.")
public @interface StaffRrnConstraints {
}
