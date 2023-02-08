package com.kanghoshin.lis.constraints.patient;

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
import javax.validation.constraints.Size;
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
@Inherited
@Documented
@Constraint(validatedBy = { })
@Size(min = 1, max = 200, message="주소는 1자 이상 200자 이하입니다.")
public @interface PatientAddressConstraints {
	String message() default "주소값이 유효하지 않습니다.";
	Class<?>[] groups() default { };
	Class<? extends Payload>[] payload() default { };
}
