import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Spinner, Table, Row, Col, Button } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../Pagination.css';

const ProfessorList = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const query = search.get("query") ? search.get("query") : "";
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const key = search.get("key") ? search.get("key") : "pcode";
    const size = 3;
    const navi = useNavigate();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const getList = async() => {
        setLoading(true);
        const res = await axios.get(`/pro/slist.json?page=${page}&size=${size}&key=${key}&query=${query}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);

    }

    useEffect(()=> {
        getList();
    }, [location]);

    const onClickRow = (pcode) => {
        navi(`/pro/read/${pcode}`);
    }

    if(loading) return <div className='text-center my-5'><Spinner/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>교수목록</h1>
            <Row className='mb-2'>
                <Col>
                    <span>검색수: {total}명</span>
                </Col>
                <Col className='text-end'>
                    <Link to="/pro/insert">
                        <Button variant='outline-dark'>교수등록</Button>
                    </Link>
                </Col>
            </Row>
            <Table striped hover bordered>
                <thead>
                    <tr className='text-center'>
                        <th>교수번호</th>
                        <th>교수이름</th>
                        <th>학과</th>
                        <th>직급</th>
                        <th>임용일자</th>
                        <th>급여</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                        <tr key={p.pcode} className='text-center' onClick={()=> onClickRow(p.pcode)} style={{cursor:'pointer'}}>
                            <td>{p.pcode}</td>
                            <td>{p.pname}</td>
                            <td>{p.dept}</td>
                            <td>{p.title}</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.fmtsalary}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={ (page)=> {navi(`/pro/list?page=${page}&query=${query}&key=${key}&size=${size}`)}}/>
            }
        </div>
    )
}

export default ProfessorList