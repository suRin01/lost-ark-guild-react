import '../../App.css';
import React from 'react';
import { commonBbsReplyWithChild } from '../../types/types';
type replyProp = {
    replyData: commonBbsReplyWithChild;
}
const Reply: React.FC<replyProp> = ({ replyData }) => {

    return (
        <div className='bbs-comment' key={`comment-id-${replyData.reply_idx}`}>
            <div className='bbs-comment-root'>
                <div className='bbs-profile'>
                    profile
                </div>
                <div className='bbs-content'>
                    <div className='comment-header'>
                        <div>
                            {replyData.input_id}
                        </div>
                        <div>
                            {replyData.input_dt}
                        </div>
                        <div>
                            신고
                        </div>
                    </div>
                    <div className='comment-text'>
                        {replyData.content}
                    </div>
                    <div className='comment-reply-btn'>
                        답글
                    </div>
                </div>
            </div>
            <div className='bbs-comment-child' style={{paddingLeft: replyData.depth > 2 ?"0rem" : "5rem" }}>
                {replyData.child.length !== 0 && replyData.child.map((reply) => {
                    return (
                        <Reply replyData={reply} key={`comment-id-${reply.reply_idx}`} />
                    )
                })}
            </div>
        </div>
    );
}

export default Reply;
