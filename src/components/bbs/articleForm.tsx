
import { useLoaderData } from 'react-router';
import { commonBbsArticle, commonCode } from '../../types/types';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';


const ArticleForm: React.FC = () => {
    const params: { articleId: string, bbsTableLookupResult: commonBbsArticle, bbsCodeList: commonCode[] } = useLoaderData() as { articleId: string, bbsTableLookupResult: commonBbsArticle, bbsCodeList: commonCode[] };
    const articleIdx = params.articleId;
    const bbsCodeList = params.bbsCodeList;

    const [value, setValue] = useState('');
    

    return (
        <Container>
            <Row style={{margin: "0.5rem 0"}}>
                <Col xs={2}  style={{padding: "0"}}>
                    <Form.Label htmlFor="category">카테고리</Form.Label>
                    <Form.Select id="category">
                        {bbsCodeList.map((bbsCode)=>{
                            return <option key={`${bbsCode.code_group_idx}-${bbsCode.detail_code_idx}`} value={`${bbsCode.code_group_idx}-${bbsCode.detail_code_idx}`}>{bbsCode.code_value}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={10}  style={{padding: "0"}}>
                    <Form.Label htmlFor="title">제목</Form.Label>
                    <Form.Control
                        type="text"
                        id="title"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ReactQuill theme="snow" value={value} onChange={setValue}>
                        <div style={{ height: "600px" }} />
                    </ReactQuill>
                </Col>
            </Row>
            <Row>
                <Col xs={12} style={{display: "flex", flexDirection: "row-reverse"}}>
                    <Button as="input" type="button" value="저장" id="svaeArticle" />
                </Col>
            </Row>
        </Container>
    );
}

export default ArticleForm;