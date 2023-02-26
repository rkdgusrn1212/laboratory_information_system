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
import com.kanghoshin.lis.config.jwt.JwtService;
import com.kanghoshin.lis.config.principal.PrincipalAuthority;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity // 시큐리티 활성화 -> 기본 스프링 필터체인에 등록
@RequiredArgsConstructor
public class SecurityConfig{	

	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final CorsConfig corsConfig;
	private final JwtService jwtService;

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
				.antMatchers("/api/doctor/register")
				.access("hasRole('"+PrincipalAuthority.ROLE_NANTYPE.getAuthority()+"')")
				.antMatchers("/api/auth/update-details")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/behavior/list")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/behavior/*")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/consultation/full-consultation/list")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/consultation")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"')")
				.antMatchers("/api/consultation-reception/appointment/list")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/consultation-reception/walk-in/list")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/doctor/register")
				.access("hasRole('"+PrincipalAuthority.ROLE_NANTYPE.getAuthority()+"')")
				.antMatchers("/api/doctor/")
				.access("hasRole('"+PrincipalAuthority.ROLE_NANTYPE.getAuthority()+"')")
				.antMatchers("/api/nurse/register")
				.access("hasRole('"+PrincipalAuthority.ROLE_NANTYPE.getAuthority()+"')")
				.antMatchers("/api/patient/register")
				.access("hasRole('"+PrincipalAuthority.ROLE_NANTYPE.getAuthority()+"')")
				.antMatchers("/api/prescription")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"')")
				.antMatchers("/api/prescription/list")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/prescription/list/count")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/prescription-order")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"')")
				.antMatchers("/api/specimen-container/**")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/specimen-type/**")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/test-field/**")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"') OR hasRole('"+PrincipalAuthority.ROLE_NURSE.getAuthority()+"')")
				.antMatchers("/api/test-prescription")
				.access("hasRole('"+PrincipalAuthority.ROLE_DOCTOR.getAuthority()+"')")
				.anyRequest().permitAll()
				.and()
				.build();
	}

	private JwtAuthenticationFilter createJwtAuthenticationFilter() {
		JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManagerBuilder.getOrBuild(), jwtService);	
		jwtAuthenticationFilter.setFilterProcessesUrl("/api/auth/signin");
		return jwtAuthenticationFilter;
	}

	@Bean
	public PasswordEncoder getPasswordEncoder(){
		return new BCryptPasswordEncoder();
	}
}
