package com.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.PurchaseDAO;
import com.example.domain.OrderVO;
import com.example.domain.PurchaseVO;
import com.example.domain.UserVO;
import com.example.service.PurchaseService;

@RestController
@RequestMapping("/purchase")
public class PurchaseRestController {

	@Autowired
	PurchaseDAO dao;
	
	@Autowired
	PurchaseService service;
	
	@PostMapping("/insert")
	public String insert(@RequestBody PurchaseVO vo) {
		String oid = UUID.randomUUID().toString().substring(0, 20);
		vo.setOid(oid);
		/*System.out.println(vo.toString()); //구매자 정보
		
		List<OrderVO> orders = vo.getOrders();
		for(OrderVO order:orders) {
			order.setOid(oid);
			System.out.println(order.toString()); //구매상품 정보
		}*/
		
		//dao.insertPurchase(vo);
		
		service.insertPurchase(vo);
		return oid;
	}
	
	@GetMapping("/list.json")
	public HashMap<String, Object> purchaseList(UserVO vo){
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", dao.listPurchase(vo));
		map.put("total", dao.totalPurchase(vo.getUid()));
		
		return map;
	}
	
	@GetMapping("/list.json/{oid}")
	public List<HashMap<String, Object>> ordersList(@PathVariable String oid){
		return dao.listOrders(oid);
	}
	
}
