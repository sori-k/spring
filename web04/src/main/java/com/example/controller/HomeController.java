package com.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
public class HomeController {
	
    @GetMapping("/display")
    public ResponseEntity<Resource> display(@RequestParam("file") String file) {
        Resource resource = new FileSystemResource("c:" + file);
        if(!resource.exists()) return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
        HttpHeaders header = new HttpHeaders();
        try{
            Path filePath = Paths.get("c:" + file);
            header.add("Content-type", Files.probeContentType(filePath));
        }catch(Exception e) {
            System.out.println("오류:" + e.toString());
        }
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }
   
   
	@GetMapping("/hello")
	public String hello() {
		return "hello.......";
	}

}
