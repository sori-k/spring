package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.PurchaseDAO;
import com.example.domain.OrderVO;
import com.example.domain.PurchaseVO;

@Service
public class PurchaseServiceImpl implements PurchaseService{

	@Autowired
	PurchaseDAO dao;
	
	@Transactional
	@Override
	public void insertPurchase(PurchaseVO vo) {
		dao.insertPurchase(vo);
		
		List<OrderVO> orders = vo.getOrders();
		for(OrderVO order:orders) { //orders에서 하나씩 꺼내서 order에 넣음
			order.setOid(vo.getOid());
			dao.insertOrder(order);
		}
	}

}
