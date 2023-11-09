package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.PostVO;

@Repository
public class PostDAOImpl implements PostDAO{
	@Autowired
	SqlSession session; //데이터베이스 커넥션에 대한 정복가 들어있다.
	String namespace="com.example.mapper.PostMapper";
	
	@Override
	public List<HashMap<String, Object>> list() {
		return session.selectList(namespace + ".list");
	}

	@Override
	public HashMap<String, Object> read(int pid) {
		return session.selectOne(namespace + ".read", pid); //mapper에서 보낸 #{pid} 랑 똑같은 이름으로 해야함
	}

	@Override
	public void insert(PostVO vo) {
		session.insert(namespace + ".insert", vo);
		
	}

	@Override
	public void delete(int pid) {
		session.delete(namespace + ".delete", pid);
		
	}

	@Override
	public void update(PostVO vo) {
		session.update(namespace + ".update", vo);
		
	}

}
