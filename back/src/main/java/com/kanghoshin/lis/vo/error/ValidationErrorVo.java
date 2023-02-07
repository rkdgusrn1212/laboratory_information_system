package com.kanghoshin.lis.vo.error;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class ValidationErrorVo extends GeneralErrorVo{

	public ValidationErrorVo(ValidationErrorItemVo[] array) {
		super("validation");
		this.array = array;
	}
	
	@AllArgsConstructor
	@Getter
	public static class ValidationErrorItemVo{
		private final String field;
		private final String value;
		private final String message;
	}
	
	private final ValidationErrorItemVo[] array;
	
	public ValidationErrorItemVo[] getArray() {
		return Arrays.copyOf(array, array.length);
	}
}
