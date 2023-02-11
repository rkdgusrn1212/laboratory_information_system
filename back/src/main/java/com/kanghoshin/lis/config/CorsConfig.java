package com.kanghoshin.lis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:3000/");
		config.addAllowedOrigin("http://localhost:8080/");
		config.addAllowedOrigin("chrome-extension://aejoelaoggembcahagimdiliamlcdmfm/");//talend에서 들어오는 요청을 수용하기 위해, 언젠가부터 origin값이 이럼(원래는 ip로도 됐음). 나중에 삭제해야함
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		source.registerCorsConfiguration("/api/**", config);
		return new CorsFilter(source);
	}

}
