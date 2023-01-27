package com.kanghoshin.lis.constraints.staff;

import javax.validation.constraints.Size;

@Size(min=1, max=40, message="이름은 1자이상 40자 이하만 가능합니다.")
public @interface StaffNameConstraints {
}
