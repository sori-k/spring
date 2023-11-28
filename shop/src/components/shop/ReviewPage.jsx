import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "../Pagination.css";
import Pagination from "react-js-pagination";

const ReviewPage = ({pid}) => {
    const [body, setBody] = useState('');
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const size = 3;

    const getList = async() => {
        const res = await axios.get(`/review/list.json?page=${page}&size=${size}&pid=${pid}`);
        //console.log(res.data);
        let data = res.data.list.map(r=> r && {...r, ellipsis:true, view:true, text:r.body}); //text는 수정하기 전(고정값) :body는 수정후
        setList(data);
        setTotal(res.data.total);
    }

    useEffect(()=> {
        getList();
    }, [page]);


    //등록버튼 눌렀을때
    const onRegister = async() => {
        if(body === ""){
            alert("리뷰 내용을 작성하세요.");
        }else{
            const data = {pid, uid:sessionStorage.getItem("uid"), body};
            //console.log(data);
            //댓글 등록 작업
            await axios.post("/review/insert", data);
            setBody("");
            getList();
        }
    }

    //로그인 버튼 눌렀을때
    const onClickLogin = () => {
        sessionStorage.setItem("target", `/shop/info/${pid}`); //돌아올 주소를 target에 저장
        window.location.href="/login";
    }

    const onClickBody = (cid) => {
        const data = list.map(r=> r.cid === cid ? {...r, ellipsis:!r.ellipsis} : r); //원래있던 ellipsis와 반대로 값을 넣어준다.
        setList(data);
    }

    //리뷰 삭제버튼 눌렀을때
    const onDelete = async(cid) => {
        if(window.confirm(`${cid}번 리뷰를 삭제할까요?`)){
            await axios.post(`/review/delete/${cid}`);
            getList();
        }
    }

    //리뷰 수정버튼 눌렀을때
    const onClickUpdate = (cid) => {
        const data = list.map(r=> r.cid === cid ? {...r, view:false} : r);
        setList(data);
    }

    //리뷰 수정취소 버튼 눌렀을때
    const onClickCancel = (cid) => {
        const data = list.map(r=> r.cid === cid ? {...r, view:true, body:r.text} : r);
        setList(data);
    }

    const onChangeBody = (e, cid) => {
        const data = list.map(r=> r.cid === cid ? {...r, body:e.target.value} : r);
        setList(data);
    }

    //리뷰 수정 저장버튼 눌렀을때
    const onClickSave = async(cid, body, text) => {
        if(body === text){ //바뀌지않았을때
            onClickCancel(cid);
        }else{
            if(window.confirm(`${cid}번 리뷰를 수정할까요?`)){
            //리뷰 수정 작업
            await axios.post("/review/update", {cid, body});
            alert("수정완료!");
            getList();
            }
        }
    }

    return (
        <div>
            {sessionStorage.getItem("uid") ?
                <div>
                    <Form.Control onChange={(e)=> setBody(e.target.value)} value={body}
                        as="textarea" rows={5} placeholder='리뷰 내용을 입력하세요.'/>
                    <div className='text-end mt-2'>
                        <Button onClick={onRegister}
                            className='btn-sm px-4' variant='dark'>등록</Button>
                    </div>
                </div>
                :
                <div className='mb-3'>
                    <Button onClick={onClickLogin} className='w-100' variant='dark'>로그인</Button>
                </div>
            }
            <div><span>리뷰수 : {total}</span></div>
            <hr/>
            <div>
                {list.map(r=>
                    <div key={r.cid}>
                        <div>
                            <small>{r.regdate}</small>
                            <small className='ms-2'>({r.uid})</small>
                        </div>
                        
                        {r.view ?
                        //댓글 보기 (view가 true일때)
                        <>
                            <div onClick={()=> onClickBody(r.cid)}
                                className={r.ellipsis && 'ellipsis'} style={{cursor:'pointer'}}>[{r.cid}] {r.text}
                            </div>
                            {sessionStorage.getItem("uid") === r.uid &&
                                <div className='text-end'>
                                    <Button onClick={()=> onClickUpdate(r.cid)}
                                        variant='outline-secondary btn-sm'>수정</Button>
                                    <Button onClick={()=> onDelete(r.cid)}
                                        variant='outline-dark btn-sm ms-2'>삭제</Button>
                                </div>
                            }
                        </>
                        :
                        //댓글 수정 (view가 false일때)
                        <div>
                            <Form.Control onChange={(e)=> onChangeBody(e, r.cid)}
                                as="textarea" rows="5" value={r.body}/>
                            <div className='text-end mt-2'>
                                <Button onClick={()=> onClickSave(r.cid, r.body, r.text)}
                                    variant='danger btn-sm'>저장</Button>
                                <Button onClick={()=> onClickCancel(r.cid)}
                                    variant='secondary btn-sm ms-2'>취소</Button>
                            </div>
                        </div>
                        }
                        <hr/>
                    </div>
                )}
            </div>
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

export default ReviewPage