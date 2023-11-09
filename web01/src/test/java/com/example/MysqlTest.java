package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dao.MysqlDAO;
import com.example.dao.PostDAO;
import com.example.dao.UserDAO;
import com.example.domain.PostVO;

@SpringBootTest
public class MysqlTest {
	/*
	@Autowired
	MysqlDAO dao;
	
	@Autowired
	PostDAO pdao;
	
	@Test
	public void list() {
		pdao.list();
	}
	*/
	
	@Autowired
	UserDAO dao;
	
	@Test
	public void read() {
		dao.read("sky");
	}
}
