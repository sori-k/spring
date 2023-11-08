package com.example.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MysqlDAOImpl implements MysqlDAO {
	@Autowired //연결해주라는 것
	SqlSession session; //db 연결 정보가 있는 (sqlsession을 session으로 해서) mysql config에서 session정보에 다 들어있다.
	String namespace="com.example.mapper.MysqlMapper";
	
	@Override
	public String now() { //now() 함수를 실행하면
		return session.selectOne(namespace + ".now"); //namespace에 있는 id가 now인거를 실행
	}

}
