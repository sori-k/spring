package com.example.controller;
//페이지 출력하는 곳
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
		model.addAttribute("pageName", "users/login");
		return "home"; //login.html을 담아서 
	}
	
	@GetMapping("/mypage")
	public String mypage(Model model) {
		model.addAttribute("pageName", "users/mypage");
		return "home.html";
	}
	
	@GetMapping("/update")
	public String update(Model model) {
		model.addAttribute("pageName", "users/update.html");
		return "home.html"; 
	}
	
	@GetMapping("/password")
	public String password(Model model) {
		model.addAttribute("pageName", "users/password.html");
		return "home";
	}
	
	@GetMapping("/insert")
	public String insert(Model model) {
		model.addAttribute("pageName", "users/insert.html");
		return "home";
	}
}
