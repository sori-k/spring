package com.example.controller;
import java.io.File;
//데이터 처리하는
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.UserDAO;
import com.example.domain.UserVO;
//데이터 출력

@RestController
@RequestMapping("/users")
public class UserRESTController {
	
	@Autowired
	UserDAO dao;
	
	@GetMapping("/read") //데이터 가져올때 localhost:8080/users/read?uid=blue
	public HashMap<String, Object> read(String uid){
		return dao.read(uid);
	}
	
	@PostMapping("/login") //데이터 입력, 수정 할때
	public int login(@RequestBody UserVO vo) { //입력받은 값(UserVO)
		int result = 0;
		UserVO user = dao.login(vo.getUid()); //읽어온 값
		
		if(user != null) { //uid가 있으면
			if(vo.getUpass().equals(user.getUpass())) { //있는데 패스워드가 같으면
				result = 1;
			}else {
				result = 2;
			}
		}
		return result;
	}

	//데이터 업데이트
	@PostMapping("/update")
	public void update(@RequestBody UserVO vo) {
		//System.out.println(vo.toString());
		dao.update(vo);
	}
	
	//사진업로드 컨트롤러
	@PostMapping("/upload")
	public void upload(String uid, MultipartHttpServletRequest multi)throws Exception {
		MultipartFile file=multi.getFile("file"); // 파일업로드 -> multi -> file //multi 에 있는 파일을 받아서 파일로
		String filePath = "/upload/photo/"; //filepath 지정
		String fileName = System.currentTimeMillis() + ".jpg"; //현재 시간(초 포함) 기준 이름 지정 
		file.transferTo(new File("c:" + filePath + fileName));
		
		UserVO vo = new UserVO();
	    vo.setUid(uid);
	    vo.setPhoto(filePath + fileName);
	    dao.photo(vo);
	}
	
	//비밀번호 변경
	@PostMapping("/password")
	public void password(@RequestBody UserVO vo) {
		dao.password(vo);
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody UserVO vo) {
		//System.out.println(vo.toString());
		dao.insert(vo);
	}
}
