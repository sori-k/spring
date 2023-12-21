package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dao.MysqlDAO;
import com.example.dao.UserDAO;
import com.example.domain.UserVO;

@SpringBootTest
class Web04ApplicationTests {

	@Autowired
	MysqlDAO dao;
	
	@Autowired
	UserDAO udao;
	
	@Test
	void contextLoads() {
		System.out.println("......................." + dao.now());
	}
	/*
	@Test
	void userList() {
		udao.list();
	}
	*/
	/*
	@Test
	void userRead() {
		udao.read("blue");
	}
	
	@Test
	void userInsert() {
		UserVO vo = new UserVO();
		vo.setUid("white");
		vo.setUpass("pass");
		vo.setUname("화이트");
		vo.setAddress1("서울 양천구 목동");
		vo.setAddress2("현대아파트");
		vo.setPhone("010-1234-5678");
		udao.insert(vo);
	}
	
	@Test
	void userRead() {
		udao.read("white");
	}
	*/
	/*
	@Test
	void userUpdate() {
		UserVO vo = udao.read("sky");
		//vo.setAddress1("서울 성동구 성수동");
		vo.setPhone("010-9876-5432");
		udao.update(vo);
	}
	*/
	@Test
	void userRead() {
		udao.read("sky");
	}
}
