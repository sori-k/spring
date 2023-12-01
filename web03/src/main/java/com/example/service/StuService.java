package com.example.service;

import com.example.domain.EnrollVO;

public interface StuService {
	public void insertEnroll(EnrollVO vo); //수강신청 등록
	public void deleteEnroll(EnrollVO vo); //수강신청 취소
}
