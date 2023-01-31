package com.kanghoshin.lis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.kanghoshin.lis.config.jwt.JwtAuthenticationFilter;
import com.kanghoshin.lis.config.jwt.JwtAuthorizationFilter;
import com.kanghoshin.lis.config.principal.PrincipalAuthority;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity // 시큐리티 활성화 -> 기본 스프링 필터체인에 등록
@RequiredArgsConstructor
public class SecurityConfig{	

	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final CorsConfig corsConfig;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.addFilter(corsConfig.corsFilter())
				.csrf().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.formLogin().disable()
				.httpBasic().disable()
				.addFilter(createJwtAuthenticationFilter())
				.addFilter(new JwtAuthorizationFilter(authenticationManagerBuilder.getOrBuild()))
				.authorizeRequests()
				.antMatchers("/api/auth/write-details")
				.access("hasRole('"+PrincipalAuthority.ROLE_AUTHONLY.getAuthority()+"')")
				.antMatchers("/api/doc/**")
				.access("hasRole('ROLE_DOC')")
				.antMatchers("/api/nur/**")
				.access("hasRole('ROLE_NUR')")
				.anyRequest().permitAll()
				.and()
				.build();
	}

	private JwtAuthenticationFilter createJwtAuthenticationFilter() {
		JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManagerBuilder.getOrBuild());	
		jwtAuthenticationFilter.setFilterProcessesUrl("/api/auth/signin");
		return jwtAuthenticationFilter;
	}

	@Bean
	public PasswordEncoder getPasswordEncoder(){
		return new BCryptPasswordEncoder();
	}
}
