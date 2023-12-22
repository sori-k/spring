package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.ShopVO;

public interface ShopDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
	public int total();
	public void insert(ShopVO vo);
	public ShopVO read(int pid);
	public void update(ShopVO vo);
	public void updateImage(ShopVO vo); //상품이미지변경
}
