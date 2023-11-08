package com.example.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.dao.PostDAO;
import com.example.domain.PostVO;

@Controller
@RequestMapping("/posts")
public class PostController {
	@Autowired
	PostDAO dao;
	
	@GetMapping("/") //path(주소)
	public String list(Model model) {
		model.addAttribute("pageName", "posts/list");
		model.addAttribute("posts", dao.list());
		return "home";
	}
	/*
	@GetMapping("/test") //path(주소)
	public String test(Model model) {
		model.addAttribute("pageName", "posts/test");
		return "posts/test";
	}
	*/
	
	//데이터 출력
	@GetMapping("/list.json") //"/posts/list.json" <- 위에 RequestMapping 안적으면
	@ResponseBody
	public List<HashMap<String, Object>> list(){
		return dao.list();
	}
	
	@GetMapping("/insert")
	public String insert(Model model) {
		model.addAttribute("pageName", "posts/insert");
		return "home";
	}
	
	@GetMapping("/read")
	public String insert(Model model, int pid) {
		model.addAttribute("pid", pid);
		model.addAttribute("pageName", "posts/read");
		return "home";
	}
	
	//저장
	@PostMapping("/insert") //위에는 get이라 같은 /insert를 사용해도 가능
	@ResponseBody //rest api를 사용할거면 작성해야함.
	public void insert(PostVO vo) {
		dao.insert(vo);
	}
	
	@GetMapping("/read.json") //localhost:8080/posts/read.json?pid=4 , PostVO는 정해진것만 출력, HashMap는 자유롭게 가능
	@ResponseBody
	public HashMap<String, Object> read(int pid) {
		return dao.read(pid);
	}
	
	@PostMapping("/delete")
	@ResponseBody
	public void delete(int pid) {
		dao.delete(pid);
	}
}
