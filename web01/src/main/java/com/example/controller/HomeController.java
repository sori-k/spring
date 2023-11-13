package com.example.controller;

//import java.util.HashMap;
//import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.ResponseEntity;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

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

	//서버에 있는 이미지를 출력해주는 컨트롤러
   @GetMapping("/display")
   public ResponseEntity<Resource> display(String file) { //localhost:8080/display?file=경로(보고싶은 이미지)
      Resource resource = new FileSystemResource("c:" + file);
      if(!resource.exists()) 
         return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
      HttpHeaders header = new HttpHeaders();
      try{
         Path filePath = Paths.get("c:" + file);
         header.add("Content-type", Files.probeContentType(filePath));
      }catch(Exception e) {
         System.out.println("오류:" + e.toString());
      }
      return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
   }
}
