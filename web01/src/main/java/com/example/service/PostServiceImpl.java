package com.example.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.PostDAO;

@Service
public class PostServiceImpl implements PostService{

	@Autowired
	PostDAO dao;
	
	@Transactional
	@Override
	public HashMap<String, Object> read(int pid) { //transaction으로 묶여서 둘 중 하나가 잘못되면 다시 처음으로 롤백됨
		dao.viewcnt(pid);
		return dao.read(pid);
	}

}
