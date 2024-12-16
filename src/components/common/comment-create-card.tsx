import * as React from 'react';
import MarkdownHandler from './markdown-editor.tsx';
import { User } from '../../models/index.ts';
import { createNewComment } from '../../api/threads.ts';

export default function CommentsCreateCard(props: {threadID: string}) {
    const {threadID} = props;
    const user: User = {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? ''
    }
    
    const [isToggle, setIsToggle] = React.useState(false);
    const [commentsContent, setCommentsContent] = React.useState("");

    const onSubmit = async () => {
        await createNewComment(user, threadID, commentsContent)
        window.location.reload(); 
    }
    return (
        <div className='flex flex-col w-full text-left gap-2 duration-200'>
            <button 
                className="block mb-2 text-base bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 text-left w-fit py-2 "
                onClick={() => setIsToggle(!isToggle)}
            >
                Reply ✉️
            </button>
           {isToggle &&
           <>
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