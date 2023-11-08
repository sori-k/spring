package com.example.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
	@GetMapping("/hello")
	@ResponseBody //데이터 출력할때 필요
	public String hello() {
		
		return "hello.......";
		
		/**
		Map<String, Object> test = new HashMap<String, Object>();
		test.put("아이디", "test");
		test.put("패스워드", 1234);
		return test;
		*/
				
	}
	
	@GetMapping("/")
	public String home(Model model) {
		model.addAttribute("pageName", "about"); //(변수, 값)을 model 안에 넣어서 
		return "home";
	}
}
