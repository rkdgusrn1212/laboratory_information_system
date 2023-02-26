package com.kanghoshin.lis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class BackApplication {


	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}
}
