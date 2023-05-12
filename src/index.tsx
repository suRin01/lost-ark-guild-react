import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BbsMain from './components/bbs/bbs';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/global/Layout';
import { commonBbsArticle, commonCode, HttpStatus } from './types/types';
import Article from './components/bbs/article';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const commonAjax = (url: string, 
                    method: "GET" | "POST", 
                    data: {urlQueryKey: string, urlQueryValue: string} | {urlQueryKey: string, urlQueryValue: string}[] | any = null, 
                    headers: {headerText: string, headerValue: string}[] = [])=>{
    return new Promise((resolve: (successValue:object)=>void, reject:(failValue: {status: number, statusText: string})=>void)=>{
        let xhrObj = new XMLHttpRequest();
        xhrObj.onreadystatechange = (event: Event)=>{
            // if(xhrObj.readyState === 0){
            //     //xhr client is ready
            // }else if(xhrObj.readyState === 1){
            //     //xhr client opened
            // }else if(xhrObj.readyState === 2){
            //     //xhr send method call
            // }else if(xhrObj.readyState === 3){
            //     //xhr response data is on loading
            // }else 
            
            if(xhrObj.readyState === XMLHttpRequest.DONE){
                // request finished
                if(xhrObj.status === HttpStatus.OK){
                    //request finished with success
                    console.log(xhrObj.response);
                    resolve(xhrObj.response);
                }else{
                    //request finished with error
                    reject({status: xhrObj.status, statusText: xhrObj.statusText});
                }
            }
        }

        let urlObject = new URL(url);

        if(method === 'GET'){
            if(Array.isArray(data)){
                const searchQueryData = data as {urlQueryKey: string, urlQueryValue: string}[];
                searchQueryData.map(dataNode=>{
                    urlObject.searchParams.set(dataNode.urlQueryKey, dataNode.urlQueryValue)
                })
            }else if(data !== null && data.urlQueryKey === undefined && data.urlQueryValue === undefined){
                urlObject.searchParams.set(data.urlQueryKey, data.urlQueryValue)
            }
        }

        xhrObj.open(method, urlObject, true);
        headers.map((header)=>{
            xhrObj.setRequestHeader(header.headerText, header.headerValue);
        })
        xhrObj.responseType = 'json';
        xhrObj.send(data);

    })
    
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

    }, {
        path: "/bbs/:bbsId",
        loader: async ({ request, params }) => {
            const articleList = await commonAjax(`/bbs/${params.bbsId}`, 'GET')
            const articleCodeList = await commonAjax(`/code/detail`, 'GET', {code_group_idx: 1})

            console.log(articleCodeList);
            const bbsId = params.bbsId;
            /***
             * get bbs section code list
             */
            const bbdCodeList: commonCode[] = [{
                code_group_idx: 10,
                detail_code_idx: 1,
                detail_code: "1",
                code_value: "전체"
            }, {
                code_group_idx: 10,
                detail_code_idx: 2,
                detail_code: "2",
                code_value: "잡담"
            }, {
                code_group_idx: 10,
                detail_code_idx: 3,
                detail_code: "3",
                code_value: "공대원찾음"
            }, {
                code_group_idx: 10,
                detail_code_idx: 4,
                detail_code: "4",
                code_value: "공대찾음"
            },
            ];

            return { articleList, bbsSection: bbdCodeList }
        },
        element: <Layout><BbsMain /></Layout>
    }, {
        path: "/bbs/article/:articleId",
        loader: ({ request, params }) => {
            const articleId = params.articleId;
            /***
             * get bbs section code list
             */
            const bbsTableLookupResult: commonBbsArticle = {
                article_idx: 1,
                bbs_idx: 1,
                article_code: '10-2',
                title: '1번 게시물',
                content: '1번 게시물이지롱',
                file_id: null,
                input_id: 'user1',
                input_dt: '2023/5/03',
                update_id: null,
                update_dt: null,
                is_deleted: 'N',
                delete_dt: null,
                _count: {
                    common_bbs_reply: 4
                }
            };

            const bbsCodeList: commonCode[] = [{
                code_group_idx: 10,
                detail_code_idx: 1,
                detail_code: "1",
                code_value: "전체"
            }, {
                code_group_idx: 10,
                detail_code_idx: 2,
                detail_code: "2",
                code_value: "잡담"
            }, {
                code_group_idx: 10,
                detail_code_idx: 3,
                detail_code: "3",
                code_value: "공대원찾음"
            }, {
                code_group_idx: 10,
                detail_code_idx: 4,
                detail_code: "4",
                code_value: "공대찾음"
            },
            ];

            return { articleId, bbsTableLookupResult, bbsCodeList }
        },
        element: <Layout><Article /></Layout>
    }, {
        path: "/",
        element: <App />
    },
]);


root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>

    /*
    <React.StrictMode>
      <App />
    </React.StrictMode>
    */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
