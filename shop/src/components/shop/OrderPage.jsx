import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Alert } from 'react-bootstrap'
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import ModalPost from '../user/ModalPost';

const OrderPage = ({list, checkSum}) => {
    const [form, setForm] = useState('');
    const {uid, uname, phone, address1, address2} = form;

    const getUser = async() => {
        const res = await axios.get(`/user/read?uid=${sessionStorage.getItem("uid")}`);
        setForm(res.data);
    }

    useEffect(()=> {
        getUser();
    }, []);

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onPostcode = (address) => {
        setForm({
            ...form,
            address1: address
        })
    }

    const onOrder = async() => {
        if(window.confirm("위 상품을 주문할까요?")){
            const orders = list.filter(s=> s.checked);
            //console.log(orders);
            const res = await axios.post("/purchase/insert", {...form, sum:checkSum, orders});
            //장바구니 비우기
            for(const order of orders){
                await axios.post(`/cart/delete/${order.cid}`);
            }
            window.location.href=`/order/complete/${res.data}`;
        }
    }

    return (
        <div className='my-5'>
            <h1 className='text-center'>주문하기</h1>
            <Table>
                <thead>
                    <tr className='text-center'>
                        <th colSpan={2}>상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s=> s.checked &&
                        <tr>
                            <td>
                                [{s.cid}]
                                <img src={`/display?file=${s.image}`} width="30"/>
                            </td>
                            <td>{s.title}</td>
                            <td>{s.fmtprice}원</td>
                            <td>{s.qnt}</td>
                            <td className='text-end'>{s.fmtsum}원</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Alert className='text-end'>
                <span>주문총액: {checkSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
            </Alert>
            <h1 className='text-center mb-5'>주문자 정보</h1>
            <div>
                <form>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control name="uid" value={uid} readOnly/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>회원명</InputGroup.Text>
                        <Form.Control name="uname" onChange={onChangeForm} value={uname} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>전화</InputGroup.Text>
                        <Form.Control name="phone" onChange={onChangeForm} value={phone} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>주소</InputGroup.Text>
                        <Form.Control name="address1" value={address1} readOnly/>
                        <ModalPost onPostcode={onPostcode}/>
                    </InputGroup>
                    <Form.Control name="address2" onChange={onChangeForm} value={address2} placeholder='상세주소'/>
                </form>
                <div className='text-center my-5'>
                    <Button onClick={onOrder} variant='danger px-5'>주문하기</Button>
                </div>
            </div>
        </div>
    )
}

export default OrderPage