import * as React from 'react';
import {Comment} from '../../models'
import { convertTimeToMessageHistory } from '../../utils/message-history.ts';
import { truncateBody } from '../../utils/truncate-body.ts';
import { createSearchParams, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';

export default function CommentCard(props: Comment) {
    const navigate = useNavigate();
    const {content, id, user, likes, views, createdAt} = props
    const tags = []
    const time = convertTimeToMessageHistory(createdAt);
    return (
        <div className='flex flex-col text-left bg-blue-50 hover:bg-blue-100 rounded-xl  my-3 py-5 px-6'>
            <div className='text-xs'>
                {user.name} 
                {"  : "}
                <span className='font-bold'>
                    {time}
                </span>
            </div>
            <div className='text-sm py-3'>
                <MDEditor.Markdown 
                    className='w-full my-5 h-fit' source={content}
                    style={{'fontFamily':'"Poppins", sans-serif', 'backgroundColor':'inherit'}}
                />
            </div>
        </div>
    )
}