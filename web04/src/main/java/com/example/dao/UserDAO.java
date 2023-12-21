package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.UserVO;

public interface UserDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
	public UserVO read(String uid);
	public void insert(UserVO vo);
	public void update(UserVO vo);
	public int total(QueryVO vo);
	public List<HashMap<String, Object>> list_search(QueryVO vo);

}
