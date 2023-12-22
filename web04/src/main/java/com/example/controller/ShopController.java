package com.example.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.ShopDAO;
import com.example.domain.QueryVO;
import com.example.domain.ShopVO;

@RestController //data 출력 (page만 -> 일반 controller)
@RequestMapping("/shop")
public class ShopController {
	
	@Autowired
	ShopDAO dao;
	
	@GetMapping("/list")
	public HashMap<String, Object> list(QueryVO vo){
		HashMap<String, Object> map = new HashMap<>();
		map.put("list", dao.list(vo));
		map.put("total", dao.total());
		return map;
	}
	
	//상품 등록
	@PostMapping("/insert")
	public void insert(@RequestBody ShopVO vo) {
		dao.insert(vo);
	}
	
	//상품 정보 읽기
	@GetMapping("/read/{pid}")
	public ShopVO read(@PathVariable("pid") int pid) {
		return dao.read(pid);
	}
	
	//상품 정보 수정
	@PostMapping("/update")
	public void update(@RequestBody ShopVO vo) {
		dao.update(vo);
	}
	
	@PostMapping("/upload/image")
	public void uploadImage(@RequestParam("pid") int pid, MultipartHttpServletRequest multi) {
		try {
			//file upload
			MultipartFile file = multi.getFile("file");
			String filePath = "/upload/shop1/";
			String fileName = pid + "_" + System.currentTimeMillis() + ".jpg";
			file.transferTo(new File("c:" + filePath + fileName));
			
			//file image name 변경
			ShopVO vo = new ShopVO();
			vo.setPid(pid);
			vo.setImage(filePath + fileName);
			dao.updateImage(vo);
			
		}catch(Exception e) {
			System.out.println("이미지 업로드 오류: " + e.toString());
		}
	}
}
