import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, InputGroup, Form, Row, Col, Button } from 'react-bootstrap';

const SearchPage = () => {
    const [list, setList] = useState([]);
    const [query, setQuery] = useState("노트북");
    const [page, setPage] = useState(1);
    
    const getList = async() => {
        const res = await axios.get(`/search/list.json?page=${page}&size=5&query=${query}`);
        //console.log(res.data);
    
        const data = res.data.items;
        setList(data);
    }

    useEffect(()=> {
        getList();
    }, [page]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(query === ""){
            alert("검색어를 입력하세요.");
        }else{
            getList();
        }
    }

    const onSave = async(shop) => {
        if(window.confirm("상품을 등록할까요?")){
            await axios.post("/shop/insert", shop);
            alert("상품등록 완료!");
        }
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>상품검색</h1>
            <Row className='mb-2'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e)=> setQuery(e.target.value)}
                                placeholder='상품명, 제조사' value={query}/>
                            <Button type="submit" variant='outline-dark'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이미지</th>
                        <th>제목</th>
                        <th>가격</th>
                        <th>제조사</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s=>
                        <tr key={s.productId}>
                            <td>{s.productId}</td>
                            <td><img src={s.image} width="50"/></td>
                            <td><div className='ellipsis'>{s.title}</div></td>
                            <td>{s.lprice}</td>
                            <td>{s.maker}</td>
                            <td><Button onClick={()=> onSave(s)}
                            className='btn-sm' variant='outline-dark'>등록</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className='text-center'>
                <Button onClick={()=> setPage(page-1)} disabled={page === 1}
                    variant='secondary'>이전</Button>
                <span className='mx-2'>{page}</span>
                <Button onClick={()=> setPage(page+1)} disabled={page === 10}
                    variant='secondary'>다음</Button>
            </div>
        </div>
    )
}

export default SearchPage