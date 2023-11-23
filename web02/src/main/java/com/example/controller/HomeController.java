package com.example.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	//이미지를 보기위한 컨트롤러
	@GetMapping("/display")
	public ResponseEntity<Resource> display(String file) { // localhost:8080/display?file=경로(보고싶은 이미지)
		Resource resource = new FileSystemResource("c:" + file);
		if (!resource.exists())
			return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
		HttpHeaders header = new HttpHeaders();
		try {
			Path filePath = Paths.get("c:" + file);
			header.add("Content-type", Files.probeContentType(filePath));
		} catch (Exception e) {
			System.out.println("오류:" + e.toString());
		}
		return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
	}
}
