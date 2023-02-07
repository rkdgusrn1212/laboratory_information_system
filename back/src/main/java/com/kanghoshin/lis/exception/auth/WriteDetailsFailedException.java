package com.kanghoshin.lis.exception.auth;

import com.kanghoshin.lis.vo.error.auth.WriteDetailsErrorVo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WriteDetailsFailedException extends Exception {
	
	private static final long serialVersionUID = -14837415389916002L;

	private WriteDetailsErrorVo writeDetailErrorVo;
}
