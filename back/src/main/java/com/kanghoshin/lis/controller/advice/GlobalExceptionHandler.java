package com.kanghoshin.lis.controller.advice;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kanghoshin.lis.vo.error.ValidationErrorVo;
import com.kanghoshin.lis.vo.error.ValidationErrorVo.ValidationErrorItemVo;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationErrorVo> MethodArgumentNotValidException(MethodArgumentNotValidException exception) {
		List<FieldError> errors = exception.getBindingResult().getFieldErrors();
		ValidationErrorItemVo[] responseBody = new ValidationErrorItemVo[errors.size()];
		for(int i=0; i<responseBody.length; i++) {
			FieldError error = errors.get(i);
			responseBody[i] = new ValidationErrorItemVo(error.getField(),
					error.getRejectedValue()!=null?error.getRejectedValue().toString():null, error.getDefaultMessage());
		}
		return new ResponseEntity<ValidationErrorVo>(new ValidationErrorVo(responseBody),HttpStatus.BAD_REQUEST);
	}
}
