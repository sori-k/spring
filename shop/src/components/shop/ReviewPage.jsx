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
        setList(res.data.list);
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
                <div>
                    <Button className='w-100' variant='dark'>로그인</Button>
                </div>
            }
            <div><span>리뷰수 : {total}</span></div>
            <hr/>
            <div>
                {list.map(r=>
                    <div>
                        <div>
                            <small>{r.regdate}</small>
                            <small className='ms-2'>({r.uid})</small>
                        </div>
                        <div>{r.body}</div>
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