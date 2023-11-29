import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col, InputGroup, Form, Alert } from 'react-bootstrap';
import "../Pagination.css";
import Pagination from "react-js-pagination";
import OrderPage from './OrderPage';

const CartList = () => {
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [cnt, setCnt] = useState(0);
    const [sum, setSum] = useState(0); //장바구니 전체 합계
    const [checkSum, setCheckSum] = useState(0); //선택합계

    const [isOrder, setIsOrder] = useState(false); //true일때 주문하기 페이지 나오게
    
    const [page, setPage] = useState(1);
    const size = 1000;
    const uid = sessionStorage.getItem("uid");

    const getList = async() => {
        const res = await axios.get(`/cart/list.json?page=${page}&size=${size}&uid=${uid}`);
        //console.log(res.data);
        const data = res.data.list.map(c=> c && {...c, checked:false});
        setList(data);
        setTotal(res.data.total);
        setSum(res.data.sum);
    }

    useEffect(()=> {
        getList();
    }, [page]);

    useEffect(()=> {
        let count=0;
        let sum=0;

        list.forEach(c=>{
            if(c.checked){
                count++;
                sum+= (c.lprice * c.qnt);
            }
        });
        setCnt(count); //체크박스의 갯수가 들어감
        setCheckSum(sum);
    }, [list]);

    //삭제버튼 눌렀을때
    const onDelete = async(cid) => {
        await axios.post(`/cart/delete/${cid}`);
        getList();
    }

    //전체선택
    const onChangeAll = (e) => {
        const data = list.map(c=> c && {...c, checked:e.target.checked});
        setList(data);
    }

    //각각 선택
    const onChangeSingle = (e, cid) => {
        const data = list.map(c=> c.cid === cid ? {...c, checked:e.target.checked} : c);
        setList(data);
    }

    //선택삭제
    const onDeleteChecked = async() => {
        if(cnt === 0){
            alert("삭제할 상품을 선택하세요");
        }else{
            for(const c of list){
                if(c.checked){
                    await axios.post(`/cart/delete/${c.cid}`);
                }
            }
            getList();
        }
    }

    //상품 수량변경
    const onChangeQnt = (e, cid) => {
        const data = list.map(c=> c.cid === cid ? {...c, qnt:e.target.value} : c);
        setList(data);
    }

    //수량 수정버튼 눌렀을때
    const onUpdateQnt = async(cid, qnt) => {
        await axios.post("/cart/update/qnt", {cid, qnt});
        alert("수정완료!");
        getList();
    }

    //주문하기 버튼 눌렀을때
    const onClickOrder = () => {
        if(cnt === 0){
            alert("주문할 상품을 선택하세요!");
        }else{
            setIsOrder(true);
        }
    }

    return (
        <>
            {!isOrder ?
            <div className='my-5'>
                <h1 className='text-center mb-5'>장바구니</h1>

                {list.length > 0 ?
                <>
                    <Row className='mb-2'>
                        <Col>
                            상품수: <span>{total}</span>개
                        </Col>
                        <Col className='text-end'>
                            <Button onClick={onDeleteChecked}
                                variant='dark' className='btn-sm'>선택상품삭제</Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover className='mt-2'>
                        <thead className='text-center'>
                            <tr>
                                <th>
                                    <input type="checkbox" onChange={onChangeAll} checked={list.length === cnt}/>
                                </th>
                                <th colSpan={2}>상품명</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>합계</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(c=>
                                <tr key={c.cid}>
                                    <td><input type="checkbox" checked={c.checked} onChange={(e)=> onChangeSingle(e, c.cid)}/></td>
                                    <td className='text-center'>
                                        [{c.cid}]
                                        <img src={`/display?file=${c.image}`} width="40"/>
                                    </td>
                                    <td>[{c.pid}] {c.title}</td>
                                    <td className='text-end'>{c.fmtprice}원</td>
                                    <td>
                                        <InputGroup className='cart_input_group'>
                                            <Form.Control value={c.qnt} onChange={(e)=> onChangeQnt(e, c.cid)} type="number"/>
                                            <Button onClick={()=> onUpdateQnt(c.cid, c.qnt)}
                                                variant='outline-dark'>수정</Button>
                                        </InputGroup>
                                    </td>
                                    <td className='text-end'>{c.fmtsum}원</td>
                                    <td className='text-center'>
                                        <Button onClick={()=> onDelete(c.cid)} variant='danger btn-sm'>삭제</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Alert>
                        <Row>
                            <Col>
                                선택합계: {checkSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                            </Col>
                            <Col className='text-end'>
                                총합계: {sum}원
                            </Col>
                        </Row>
                    </Alert>
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
                    <div className='text-center'>
                        <Button onClick={onClickOrder}
                            className='px-4' variant='outline-danger'>주문하기</Button>
                    </div>
                </>
                :
                <Alert className='text-center'>장바구니가 비어있습니다.</Alert>
                }
            </div>
            :
            <OrderPage list={list} checkSum={checkSum}/>
            }
        </>
    )
}

export default CartList