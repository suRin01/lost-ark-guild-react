
import { useLoaderData } from 'react-router';
import { commonBbsArticle, commonCode } from '../../types/types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BbsTable: React.FC = () => {
    const params: { articleList:object, bbsSection: commonCode[] } = useLoaderData() as { articleList:object; bbsSection: commonCode[] };
    const articleList = params.articleList as commonBbsArticle[];
    
    const bbsRowComponent = (bbsArticleRow: commonBbsArticle)=>{
        return (
            <Row key={bbsArticleRow.article_idx}>
                <Col xs={1}>{bbsArticleRow.article_idx}</Col>
                <Col xs={1}>{bbsArticleRow.article_code}</Col>
                <Col xs={7} style={{textAlign:"left"}}>{`${bbsArticleRow.title} [${bbsArticleRow._count.common_bbs_reply}]`}</Col>
                <Col xs={1}>{bbsArticleRow.file_id !== null && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style={{height: "1em"}}><path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"/></svg>}</Col>
                <Col xs={1}>{bbsArticleRow.input_id}</Col>
                <Col xs={1}>{new Date(bbsArticleRow.input_dt).toLocaleDateString()}</Col>
            </Row>
        )
    }
    return (
        <Container>
            <Row key={"header"}>
                <Col xs={1}>No.</Col>
                <Col xs={1}>분류</Col>
                <Col xs={7} style={{textAlign:"left"}}>제목</Col>
                <Col xs={1}>첨부파일</Col>
                <Col xs={1}>작성자</Col>
                <Col xs={1}>작성일자</Col>
            </Row>
            {articleList.map(bbsRowComponent)}
        </Container>


    );
}

export default BbsTable;