package com.kanghoshin.lis.constraints.staff;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Max(value = 1, message="타입은 최대 1(의사) 입니다.")
@Min(value = 0, message="타입은 최소 0(간호사) 입니다.")
public @interface StaffTypeConstraints {
}
