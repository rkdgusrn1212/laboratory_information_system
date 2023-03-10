package com.kanghoshin.lis.constraints;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.constraints.Pattern;


@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
@Inherited
@Documented
@Constraint(validatedBy = { })
@Pattern(regexp ="^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$", message="전화번호 양식이 맞지 않습니다.")
public @interface PhoneConstraints {
	String message() default "";
	Class<?>[] groups() default { };
	Class<? extends Payload>[] payload() default { };
}
