package com.example.service;

import java.util.HashMap;

public interface PostService { //여러개의 DAO를 합쳐서 사용하기 위해? 
	public HashMap<String, Object> read(int pid);
}
