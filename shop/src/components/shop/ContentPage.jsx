import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';

const ContentPage = ({ pid, form, setForm, getShop }) => {

    const onChageContent = (data) => {
        setForm({
            ...form,
            content: data
        })
    }

    const onClickSave = async () => {
        if (form.content === "") {
            alert("내용을 입력하세요.");
        } else {
            if (window.confirm("저장할까요?")) {
                const data = { pid, content: form.content };
                //console.log(data);
                await axios.post("/shop/update/content", data);
                alert("수정완료!");
                getShop();
            }
        }
    }

    const onChangeHtml = (e) => {
        setForm({
            ...form,
            html: e.target.value
        })
    }

    //html 수정 저장버튼
    const onClickSaveHtml = async() => {
        if (form.html === "") {
            alert("내용을 입력하세요.");
        } else {
            if (window.confirm("저장할까요?")) {
                const data = { pid, content: form.html };
                //console.log(data);
                await axios.post("/shop/update/content", data);
                alert("수정완료!");
                getShop();
            }
        }
    }

    return (
        <>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="home" title="Editor">
                    <div className='text-end mb-2'>
                        <Button className='px-5' variant='dark' onClick={onClickSave}>저장</Button>
                    </div>
                    <CKEditor config={{ ckfinder: { uploadUrl: '/shop/ckupload/' + pid } }}
                        editor={ClassicEditor}
                        data={form.content}
                        onChange={(event, editor) => { onChageContent(editor.getData()); }} />
                </Tab>
                <Tab eventKey="profile" title="HTML">
                    <div className='text-end mb-2'>
                        <Button className='px-5' variant='dark' onClick={onClickSaveHtml}>저장</Button>
                    </div>
                    <Form.Control as="textarea" rows={20} value={form.html} onChange={onChangeHtml} />
                </Tab>
            </Tabs>

        </>
    )
}

export default ContentPage