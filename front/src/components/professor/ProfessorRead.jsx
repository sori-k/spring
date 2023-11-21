import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap';
import ProfessorUpdate from './ProfessorUpdate';

//특정 교수에 대한 정보를 읽어오는 페이지
const ProfessorRead = () => {
    const params = useParams();
    const pcode = params.pcode;
    const [data, setData] = useState('');
    const [edit, setEdit] = useState(false);

    const getProfessor = async() => {
        const res = await axios.get("/pro/read.json?pcode=" + pcode);
        //console.log(res.data);
        setData(res.data);
    }

    const {pname, dept, title, fmtdate, fmtsalary} = data;

    useEffect(()=> {
        getProfessor();
    }, [edit]);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>교수정보</h1>
            <Row>
                <Col>
                    {edit ? 
                        <ProfessorUpdate data={data} setEdit={setEdit}/>
                        :
                        <Card className='p-4'>
                            <div>교수이름: {pname} ({pcode})</div><hr/>
                            <div>직급: {title}</div><hr/>
                            <div>학과: {dept}</div><hr/>
                            <div>급여: {fmtsalary}원</div><hr/>
                            <div className='text-center'>
                                <Button variant='outline-dark' 
                                    className='px-5' onClick={()=> setEdit(true)}>정보수정</Button>
                            </div>
                        </Card>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default ProfessorRead