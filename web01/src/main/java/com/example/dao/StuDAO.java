package com.example.dao;

import java.util.*;

import com.example.domain.QueryVO;

public interface StuDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
	public int total(QueryVO vo);
	public HashMap<String, Object> read(String scode);
	//특정 학생의 수강신청 목록
	public List<HashMap<String, Object>> enroll(String scode);
	
}
