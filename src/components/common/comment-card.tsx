import * as React from 'react';
import {Comment, User} from '../../models'
import { convertTimeToMessageHistory } from '../../utils/message-history.ts';
import { truncateBody } from '../../utils/truncate-body.ts';
import { createSearchParams, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';

export default function CommentCard(props: Comment) {
    const navigate = useNavigate();
    const {content, id, user, likes, views, createdAt} = props
    const tags = []
    const time = convertTimeToMessageHistory(createdAt);
    const currentUser: User = {
            id: localStorage.getItem("userID") ?? '',
            name: localStorage.getItem("userName") ?? ''
    }
    return (
        <div className='flex flex-col text-left bg-yellow-50 hover:bg-yellow-100 rounded-xl  my-3 py-5 px-6'>
            <div className='text-xs'>
                {user.name} 
                {"  : "}
                <span className='font-bold'>
                    {time}
                </span>
                {(user?.name === currentUser.name) && <span>
                            <button className='text-red-600 ml-3'>✎ Edit </button>
                            <button className='text-red-600 ml-3'>🗑 Delete </button>
                </span>}
            </div>
            <div className='text-sm py-3'>
                <MDEditor.Markdown 
                    className='w-full my-1 h-fit' source={content}
                    style={{'fontFamily':'"Nunito", sans-serif', 'backgroundColor':'inherit'}}
                />
            </div>
        </div>
    )
}