package com.example.service;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.ShopDAO;
import com.example.domain.QueryVO;
import com.example.domain.ShopVO;

@Service
public class ShopServiceImpl implements ShopService{

	@Autowired
	ShopDAO dao;
	
	@Transactional
	@Override
	public void insert(ShopVO vo) {
		int result = dao.check(vo.getProductId());
		if(result == 0) {
			//이미지 업로드 작업
			UUID uuid = UUID.randomUUID(); //아이디 생성을 자동으로 해줌(겹치지않게)
			String image = uuid.toString().substring(0, 8) + ".jpg"; //새로 읽어들일 파일 이름
			try {
				URL url = new URL(vo.getImage());
				InputStream is = url.openStream(); //url에 있는 파일을 String으로 읽어들여서 읽어들인것 is에 넣기
				FileOutputStream fos = new FileOutputStream("c:/upload/shop/" + image); //파일을 어디에 
				int data;
				while((data = is.read()) != -1) {//-1일때까지 읽어들인다.
					fos.write(data);
				}
				fos.close();
				vo.setImage("/upload/shop/" + image);
				
				//데이터 저장
				dao.insert(vo);
			}catch(Exception e) {
				System.out.println("이미지업로드 오류" + e.toString());
			}
			
		}
	}
	
	@Override
	public HashMap<String, Object> list(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", dao.list(vo));
		map.put("total", dao.total(vo));
		return map;
	}

	
	@Transactional
	@Override
	public HashMap<String, Object> read(int pid, String uid) {
		dao.viewcnt(pid);
		return dao.read(pid, uid);
	}

	@Transactional
	@Override
	public void insertFavorites(int pid, String uid) {
		dao.insertFavorites(pid, uid);
		dao.updateFavorites(pid, 1);
		
	}

	@Transactional
	@Override
	public void deleteFavorites(int pid, String uid) {
		dao.deleteFavorites(pid, uid);
		dao.updateFavorites(pid, -1);
	}

}
