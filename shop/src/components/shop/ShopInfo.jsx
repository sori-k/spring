import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Button, Tab, Tabs } from 'react-bootstrap'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import ReviewPage from './ReviewPage';

const ShopInfo = () => {
    const {pid} = useParams();
    const [shop, setShop] = useState('');
    
    const {title, maker, image, fmtprice, fmtdate, ucnt, fcnt} = shop;

    const getShop = async() => {
        const res = await axios.get(`/shop/info/${pid}?uid=${sessionStorage.getItem("uid")}`);
        //console.log(res.data);
        setShop(res.data);
    }

    useEffect(()=> {
        getShop();
    }, []);

    const onClickRegHeart = async() => {
        if(!sessionStorage.getItem("uid")){
            sessionStorage.setItem("target", `/shop/info/${pid}`);
            window.location.href="/login";
        }else{
            //좋아요 추가
            await axios.get(`/shop/insert/favorites?pid=${pid}&uid=${sessionStorage.getItem("uid")}`);
            alert("좋아요추가!");
            getShop();
        }
    }

    const onClickHeart = async() => { //채워져있는 하트
        await axios.get(`/shop/delete/favorites?uid=${sessionStorage.getItem("uid")}&pid=${pid}`);
        alert("좋아요삭제!");
        getShop();
    }

    //장바구니버튼 눌렀을때
    const onClickCart = async() => {
        if(!sessionStorage.getItem("uid")){
            sessionStorage.setItem("target", `/shop/info/${pid}`);
            window.location.href="/login";
        }else{
            await axios.post("/cart/insert", {uid:sessionStorage.getItem("uid"), pid});
            if(window.confirm("쇼핑을 계속 할까요?")){
                window.location.href="/";
            }else{
                window.location.href="/cart/list";
            }
        }
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>[{pid}] 상품정보</h1>
            <Row className='mx-5'>
                <Col md={4}>
                    <img src={`/display?file=${image}`} width="90%"/>
                </Col>
                <Col className='mt-3'>
                    <h5>
                        [{pid}] {title}
                        <span className='heart mx-2'>
                        {ucnt === 0 ? <FaRegHeart onClick={onClickRegHeart}/> : <FaHeart onClick={onClickHeart}/>}
                        <small style={{fontSize:'0.7rem'}}>{fcnt}</small>
                        </span>
                    </h5>
                    <hr/>
                    <div>가격: {fmtprice}원</div>
                    <div>제조사: {maker}</div>
                    <div>등록일: {fmtdate}</div>
                    <hr/>
                    <div className='text-center'>
                        <Button variant='danger' className='px-4'>바로구매</Button>
                        <Button onClick={onClickCart}
                            variant='warning' className='px-4 ms-3'>장바구니</Button>
                    </div>
                </Col>
            </Row>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="my-5">
                <Tab eventKey="home" title="상세설명">
                    상세설명
                </Tab>
                <Tab eventKey="profile" title="상품리뷰">
                    <ReviewPage pid={pid}/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ShopInfo