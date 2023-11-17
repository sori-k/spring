package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.EnrollDAO;

@Service
public class EnrollServiceImpl implements EnrollService{ //수강신청 취소(삭제)하면서 인원도 빼주기위해

	@Autowired
	EnrollDAO dao;
	
	@Transactional
	@Override
	public void delete(String scode, String lcode) {
		dao.delete(scode, lcode);
		dao.persons(lcode, -1);
	}

	@Transactional
	@Override
	public void insert(String scode, String lcode) {
		dao.insert(scode, lcode);
		dao.persons(lcode, +1);
	}
	
}
