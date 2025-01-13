import * as React from 'react';
import MarkdownHandler from '../common/markdown-editor.tsx';
import { User } from '../../models/index.ts';
import { createNewComment } from '../../api/threads.ts';

export default function CommentsCreateCard(props: {threadID: string, fetchComments: () => Promise<void>}) {
    const {threadID, fetchComments} = props;
    const user: User = {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? ''
    }
    
    const [isToggle, setIsToggle] = React.useState(false);
    const [commentsContent, setCommentsContent] = React.useState("");
    const [message, setMessage] = React.useState("");
    const onSubmit = async () => {
        const commentRequest = await createNewComment(user, threadID, commentsContent)
        if (commentRequest.error) {
            setMessage(commentRequest.error);
            return;
        }
        await fetchComments()
        setIsToggle(false)
    }
    return (
        <div className='flex flex-col w-full text-left gap-2 duration-200'>
            <button 
                className="block mb-2 text-base bg-yellow-300 hover:bg-yellow-400 text-black rounded-full px-5 text-left w-fit py-2 "
                onClick={() => setIsToggle(!isToggle)}
            >
                Reply ✉️
            </button>
           {isToggle &&
           <>
            <div className='text-sm text-red-600'>{message}</div>
            <MarkdownHandler content={commentsContent} setContent={setCommentsContent}/>
            <div className='text-xs text-gray-400'>
                At this stage, only image URLs are allowed.
            </div>
            <button className='bg-black text-white py-2 rounded-xl' onClick={onSubmit}>SUBMIT</button>
            <hr className='my-4'/>

            </>}

        </div>
    )
}