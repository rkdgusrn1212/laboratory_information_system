package com.kanghoshin.lis.exception.auth;

import com.kanghoshin.lis.vo.error.auth.UpdateDetailsErrorVo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateDetailsFailedException extends Exception {
	
	private static final long serialVersionUID = -6113654817166965685L;
	private UpdateDetailsErrorVo updateDetailErrorVo;
}
