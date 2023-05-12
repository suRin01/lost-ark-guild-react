
import { useLoaderData } from 'react-router';
import { commonBbsArticle, commonBbsReply, commonCode, commonBbsReplyWithChild } from '../../types/types';
import { useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Reply from './reply';




const Article: React.FC = () => {
    const params: { articleId: string, bbsTableLookupResult: commonBbsArticle, bbsCodeList: commonCode[] } = useLoaderData() as { articleId: string, bbsTableLookupResult: commonBbsArticle, bbsCodeList: commonCode[] };
    const articleIdx = params.articleId;
    const bbsCodeList = params.bbsCodeList;
    const bbsTableLookupResult = params.bbsTableLookupResult;


    const dummyReplyData: commonBbsReply[] = [
        {
            reply_idx: 1,
            article_idx: 1,
            upper_reply_idx: null,
            content: "123123123",
            input_id: "user1",
            input_dt: "2023. 03. 12",
            update_id: null,
            update_dt: null,
            is_deleted: "N",
            delete_dt: null
        },
        {
            reply_idx: 2,
            article_idx: 1,
            upper_reply_idx: null,
            content: "123123123",
            input_id: "user1",
            input_dt: "2023. 03. 12",
            update_id: null,
            update_dt: null,
            is_deleted: "N",
            delete_dt: null
        },
        {
            reply_idx: 3,
            article_idx: 1,
            upper_reply_idx: 1,
            content: "123123123",
            input_id: "user1",
            input_dt: "2023. 03. 12",
            update_id: null,
            update_dt: null,
            is_deleted: "N",
            delete_dt: null
        },
        {
            reply_idx: 4,
            article_idx: 1,
            upper_reply_idx: 3,
            content: "123123123",
            input_id: "user1",
            input_dt: "2023. 03. 12",
            update_id: null,
            update_dt: null,
            is_deleted: "N",
            delete_dt: null
        },
        {
            reply_idx: 5,
            article_idx: 1,
            upper_reply_idx: 4,
            content: "123123123",
            input_id: "user1",
            input_dt: "2023. 03. 12",
            update_id: null,
            update_dt: null,
            is_deleted: "N",
            delete_dt: null
        },
        {
            reply_idx: 6,
            article_idx: 1,
            upper_reply_idx: 5,
            content: "123123123",
            input_id: "user1",
            input_dt: "2023. 03. 12",
            update_id: null,
            update_dt: null,
            is_deleted: "N",
            delete_dt: null
        },
        {
            reply_idx: 7,
            article_idx: 1,
            upper_reply_idx: 6,
            content: "123123123",
            input_id: "user1",
            input_dt: "2023. 03. 12",
            update_id: null,
            update_dt: null,
            is_deleted: "N",
            delete_dt: null
        },
    ]

    const commonCodeValue = (code: string): string =>{
        const [groupCode, keyCode] = code.split("-");
        if(keyCode === undefined){
            return ""
        }
        const value = bbsCodeList.filter((bbsCode)=>{
            if(bbsCode.code_group_idx === +groupCode && bbsCode.detail_code_idx === +keyCode){
                return bbsCode
            }
        })

        if(value.length !== 0){
            return value[0].code_value;
        }
        return "";
    }

    function fullSeachPush(rootObj: commonBbsReplyWithChild[] | commonBbsReplyWithChild, childObj: commonBbsReplyWithChild){
        if (typeof(rootObj) === "object" && !Array.isArray(rootObj)) {
            if(rootObj.reply_idx === childObj.upper_reply_idx){
                if(!Array.isArray(rootObj.child)){
                    rootObj.child = [];
                }
                rootObj.child.push({...childObj, child: [], depth: rootObj.depth+1})
                return;
            }
    
            if(rootObj.child !== undefined && rootObj.child.length !== undefined){
                fullSeachPush(rootObj.child, childObj);
            }
        }
        if (Array.isArray(rootObj)) {
            for (let idx = 0, len = rootObj.length; idx < len; ++idx) {
                fullSeachPush(rootObj[idx], childObj);
              }

        }
    }

    const replySort = (replyList: commonBbsReply[]): commonBbsReplyWithChild[] =>{

        const root:commonBbsReplyWithChild[] = [];
        const child: commonBbsReplyWithChild[] = [];

        replyList.map((reply)=>{
            if(reply.upper_reply_idx !== null){
                child.push({...reply, child: [], upper_reply_id:null, depth: 0});
            }else{
                root.push({...reply, child: [], upper_reply_id:null, depth: 0});
            }
        })

        const sortedRoot = root.sort((x, y)=>{
            if(x.reply_idx - y.reply_idx > 0){
                return 1
            } 
            return -1
        })
        const sortedChild = child.sort((x, y)=>{
            if(x.reply_idx - y.reply_idx > 0){
                return 1
            } 
            return -1
        })

        sortedChild.map((childReply)=>{
            fullSeachPush(sortedRoot, childReply);
        })


        
        return sortedRoot;
    }

    const replies:commonBbsReplyWithChild[] = replySort(dummyReplyData);



    

    return (
        <Container>
            <Row style={{margin: "0.5rem 0"}}>
                <Col xs={2}  style={{padding: "0"}}>
                    {commonCodeValue(bbsTableLookupResult.article_code)}
                </Col>
                <Col xs={10}  style={{padding: "0"}}>
                </Col>
            </Row>
            <Row style={{margin: "0.5rem 0"}}>
                <Col xs={10}  style={{padding: "0"}}>
                    <h2>
                        {bbsTableLookupResult.title}
                    </h2>
                </Col>
                <Col xs={12}>
                    <div style={{ height: "600px" }} >
                        {bbsTableLookupResult.content}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {replies.map((reply)=>{
                        return (
                            <div key={`comment-id-${reply.reply_idx}`}>
                                <Reply replyData={reply} key={`comment-id-${reply.reply_idx}`}/>
                            </div>
                        )
                    })}
                </Col>
            </Row>
            <Row>
                <Col xs={12} style={{display: "flex", flexDirection: "row-reverse", justifyContent: "space-between"}}>
                    <Button as="input" type="button" value="목록" id="returnList" />
                    <Button as="input" type="button" value="저장" id="svaeArticle" />
                </Col>
            </Row>
        </Container>
    );
}

export default Article;