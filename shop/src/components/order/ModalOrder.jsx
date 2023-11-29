import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalOrder = ({p}) => {
    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getOrders = async() => {
        const res = await axios.get(`/purchase/list.json/${p.oid}`);
        setOrders(res.data);
    }


    useEffect(()=> {
        getOrders();
    }, []);

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}>
                상세보기
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg">

                <Modal.Header closeButton>
                <Modal.Title>주문번호: {p.oid}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <div>주문자: {p.uname} ({p.uid})</div>
                            <div>전화번호: {p.phone}</div>
                            <div>주소: {p.address1} {p.address2}</div>
                            <div>주문합계: {p.fmtsum}원</div>
                        </Card.Body>
                    </Card>
                    <h3 className='text-center my-3'>주문상품</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <th colSpan={2}>상품명</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map(o=>
                                <tr key={o.pid}>
                                    <td><img src={`/display?file=${o.image}`} width="30"/></td>
                                    <td>[{o.pid}] {o.title}</td>
                                    <td>{o.fmtprice}원</td>
                                    <td>{o.qnt}</td>
                                    <td>{o.fmtsum}원</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalOrder