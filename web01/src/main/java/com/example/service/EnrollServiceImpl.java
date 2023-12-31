package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.EnrollDAO;
import com.example.domain.EnrollVO;

@Service
public class EnrollServiceImpl implements EnrollService{ //수강신청 취소(삭제)하면서 인원도 빼주기위해

	@Autowired
	EnrollDAO dao;
	
	@Transactional
	@Override
	public void delete(EnrollVO vo) {
		dao.delete(vo); //수강취소
		dao.persons(vo.getLcode(), -1); //강좌테이블에 해당 취소강좌 인원 -1
	}

	@Transactional
	@Override
	public void insert(EnrollVO vo) {
		dao.insert(vo);
		dao.persons(vo.getLcode(), +1);
	}
	
}
