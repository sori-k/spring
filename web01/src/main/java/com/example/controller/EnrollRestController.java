package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.EnrollService;

@RestController
@RequestMapping("/enroll")
public class EnrollRestController {

	@Autowired
	EnrollService service;
	
	@GetMapping("/delete")
	public void delete(String scode, String lcode) {
		service.delete(scode, lcode);
	}
	
	@GetMapping("/insert")
	public void insert(String scode, String lcode) {
		service.insert(scode, lcode);
	}
	
	
}
