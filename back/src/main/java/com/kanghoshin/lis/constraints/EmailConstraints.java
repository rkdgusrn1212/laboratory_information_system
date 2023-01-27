package com.kanghoshin.lis.constraints;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Size(max=350, message="이메일은 최대 350자")
@Pattern(regexp="^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$", message="이메일 양식이 안맞음")
public @interface EmailConstraints {
}
