package com.example.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.UserDAO;
import com.example.domain.UserVO;

@RestController
@RequestMapping("/users")
public class UserRESTController {
	
	@Autowired
	UserDAO dao;
	
	@PostMapping("/login")
	public int login(@RequestBody UserVO vo) { //입력받은 값(UserVO)
		int result = 0;
		UserVO user = dao.login(vo.getUid()); //읽어온 값
		
		if(user != null) { //uid가 있으면
			if(vo.getUpass().equals(user.getUpass())) { //있는데 패스워드가 같으면
				result = 1;
			}else {
				result = 2;
			}
		}
		return result;
	}
}
