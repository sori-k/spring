package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.ShopVO;

@Repository
public class ShopDAOImpl implements ShopDAO{

	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.ShopMapper";
	
	@Override
	public void insert(ShopVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public int check(String productId) {
		return session.selectOne(namespace + ".check", productId);
	}

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		vo.setStart((vo.getPage()-1) * vo.getSize());
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".total", vo);
	}

	@Override
	public void viewcnt(int pid) {
		session.update(namespace + ".viewcnt", pid);
		
	}

	@Override
	public void delete(int pid) {
		session.delete(namespace + ".delete", pid);
		
	}

	@Override
	public HashMap<String, Object> read(int pid) {
		return session.selectOne(namespace + ".read", pid);
	}

	@Override
	public void update(ShopVO vo) {
		session.update(namespace + ".update", vo);
		
	}

	@Override
	public void image(ShopVO vo) {
		session.update(namespace + ".image", vo);
		
	}

	@Override
	public HashMap<String, Object> read(int pid, String uid) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("pid", pid);
		map.put("uid", uid);
		return session.selectOne(namespace + ".info", map);
	}

	@Override
	public void insertFavorites(int pid, String uid) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("pid", pid);
		map.put("uid", uid);
		session.insert(namespace + ".insert_favorites", map);
	}

	@Override
	public void deleteFavorites(int pid, String uid) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("pid", pid);
		map.put("uid", uid);
		session.delete(namespace + ".delete_favorites", map);
	}

	@Override
	public void updateFavorites(int pid, int amount) { //좋아요 추가/취소에 대한 fcnt 증가/감소
		HashMap<String, Object> map = new HashMap<>();
		map.put("pid", pid);
		map.put("amount", amount);
		session.update(namespace + ".update_favorites", map);
	}

	@Override
	public void updateContent(ShopVO vo) {
		session.update(namespace + ".update_content", vo);
	}

	@Override
	public List<HashMap<String, Object>> chart1() {
		return session.selectList(namespace + ".chart1");
	}

}
