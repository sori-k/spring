package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.domain.QueryVO;
import com.example.domain.ShopSearch;

@Controller //페이지를 리턴
@RequestMapping("/search")
public class SearchNaverController {
	
	@GetMapping("/list")
	public String list() {
		return "search.html";
	}
	
	@GetMapping("/list.json")
	@ResponseBody //데이터를 출력하고 싶을때
	public String listJSON(QueryVO vo) {
		return ShopSearch.run(vo);
	}
}
