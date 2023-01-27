package com.kanghoshin.lis.constraints.staff;

import javax.validation.constraints.Pattern;


@Pattern(regexp ="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$", message="전화번호 양식이 안맞음")
public @interface StaffPhoneConstraints {
}
