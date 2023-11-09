package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

//프론트 페이지

@Controller
@RequestMapping("/users")
public class UserController {
	
	@GetMapping("/login")
	public String login(Model model) {
		model.addAttribute("pageName", "users/login.html");
		return "home";
	}
}
