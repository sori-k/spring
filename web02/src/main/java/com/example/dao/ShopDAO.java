package com.example.dao;

import java.util.*;

import com.example.domain.QueryVO;
import com.example.domain.ShopVO;

public interface ShopDAO {
	public void insert(ShopVO vo);
	public int check(String productId);
	public List<HashMap<String, Object>> list(QueryVO vo);
	public int total(QueryVO vo);
}
