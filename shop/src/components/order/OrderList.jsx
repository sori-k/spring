import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import "../Pagination.css";
import Pagination from "react-js-pagination";
import ModalOrder from './ModalOrder';

const OrderList = () => {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const size = 3;

    const getList = async() => {
        const res = await axios.get(`/purchase/list.json?uid=${sessionStorage.getItem("uid")}&size=${size}&page=${page}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
    }

    useEffect(()=> {
        getList();
    }, [page]);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>주문목록</h1>
            <div>
                주문수: {total}건
            </div>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr className='text-center'>
                        <th>주문번호</th>
                        <th>주문자명</th>
                        <th>주문일</th>
                        <th>전화번호</th>
                        <th>주문금액</th>
                        <th>상세보기</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                        <tr key={p.oid} className='text-center'>
                            <td>{p.oid}</td>
                            <td>{p.uname} ({p.uid})</td>
                            <td>{p.fmtdate}</td>
                            <td>{p.phone}</td>
                            <td>{p.fmtsum}원</td>
                            <td><ModalOrder p={p}/></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={size}
                            totalItemsCount={total}
                            pageRangeDisplayed={10}
                            prevPageText={"‹"}
                            nextPageText={"›"}
                            onChange={(page)=> setPage(page)}/>
                    }
        </div>
    )
}

export default OrderList