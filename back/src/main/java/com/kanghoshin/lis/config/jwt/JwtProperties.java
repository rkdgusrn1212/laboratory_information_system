package com.kanghoshin.lis.config.jwt;

public interface JwtProperties {
	String SECRET = "hotlinebling";
	int EXPIRATION_TIME = 86400000;//하루
	String TOKEN_PREFIX = "Bearer ";
	String HEADER_STRING = "Authorization";
}