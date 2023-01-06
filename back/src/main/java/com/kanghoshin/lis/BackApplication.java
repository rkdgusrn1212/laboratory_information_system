package com.kanghoshin.lis;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class BackApplication implements CommandLineRunner {


	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		//여기다 테스트
	}

}
