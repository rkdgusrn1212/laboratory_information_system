package com.kanghoshin.lis;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.kanghoshin.lis.model.SignInDto;
import com.kanghoshin.lis.service.AuthService;

import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class BackApplication implements CommandLineRunner {


	private final AuthService authService;

	public static void main(String[] args) {
		SpringApplication.run(BackApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		System.out.println(authService.signUp(new SignInDto("CB",
				"abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabddd")));
		System.out.println(authService.signIn(new SignInDto("CB",
				"abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabddd")).toString());
	}

}
