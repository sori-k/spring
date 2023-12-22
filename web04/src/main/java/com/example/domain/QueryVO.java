package com.example.domain;

public class QueryVO {
	private String key; //검색할때 필요
	private String word; //검색할때 필요
	private int size;
	private int page;
	private int start;
	
	public int getStart() {
		start = (page-1) * size;
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getWord() {
		return word;
	}
	public void setWord(String word) {
		this.word = word;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	
	@Override
	public String toString() {
		return "QueryVO [key=" + key + ", word=" + word + ", size=" + size + ", page=" + page + ", start=" + start
				+ "]";
	}
	
}
