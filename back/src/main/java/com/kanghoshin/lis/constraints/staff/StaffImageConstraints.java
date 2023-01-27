package com.kanghoshin.lis.constraints.staff;

import javax.validation.constraints.Size;

@Size(max=255, message="이미지 경로 최대 길이는 255")
public @interface StaffImageConstraints {
}
