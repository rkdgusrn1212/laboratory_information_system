package com.kanghoshin.lis.exception;

import com.kanghoshin.lis.vo.error.GeneralErrorWithMessageVo;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class GeneralErrorWithMessageException extends Exception {

	private static final long serialVersionUID = 2892273794838249456L;
	private GeneralErrorWithMessageVo generalErrorWithMessageVo;
}

