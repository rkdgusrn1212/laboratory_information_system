package com.kanghoshin.lis.config.jwt;

public interface JwtProperties {
	String SECRET = "hotlinebling";
	int EXPIRATION_TIME = 6000000;//100분
	String TOKEN_PREFIX = "Bearer ";
	String HEADER_STRING = "Authorization";
}