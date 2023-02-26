package com.kanghoshin.lis.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController implements ErrorController  {

	@GetMapping("signup")
	public String getSignupPage() {
		return "index.html";
	}	
	@GetMapping("recept-consultation")
	public String getReceptConsultationPage() {
		return "index.html";
	}

	@GetMapping("my-info")
	public String getMyInfoPage() {
		return "index.html";
	}

	@GetMapping("consultation")
	public String getConsultationPage() {
		return "index.html";
	}

	@GetMapping("collection")
	public String getReceptCollectionPage() {
		return "index.html";
	}

	@GetMapping("collection/collect")
	public String getBloodCollectionPage() {
		return "index.html";
	}

	@GetMapping("collection/inadequate")
	public String getReceptInadequatePage() {
		return "index.html";
	}
	

	@GetMapping("test")
	public String getTestReceptPage() {
		return "index.html";
	}

	@GetMapping("test/analysis")
	public String getTestResultAnalysisPage() {
		return "index.html";
	}

	@GetMapping("test/input")
	public String getTestResultInputPage() {
		return "index.html";
	}

	@GetMapping("test/result")
	public String getTestResultPage() {
		return "index.html";
	}

	@RequestMapping(value = "/error")
	public String getRedirectPage() {
		return "index.html";
	}
}
