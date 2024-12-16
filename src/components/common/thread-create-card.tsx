import * as React from 'react';
import MarkdownHandler from './markdown-editor.tsx';
import { User } from '../../models/index.ts';
import { createNewThread } from '../../api/threads.ts';

export default function ThreadCreateCard() {
    const tags = ["bug fixing"]
    const user: User = {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? ''
    }


    const [isToggle, setIsToggle] = React.useState(false);
    const [threadTitle, setThreadTitle] = React.useState("");
    const [threadContent, setThreadContent] = React.useState("");

    const onSubmit = async () => {
        await createNewThread(user, threadTitle, threadContent)
        window.location.reload(); 
    }
    return (
        <div className='flex flex-col w-full text-left gap-2 duration-200'>
            <button 
                className="block mb-2 text-base bg-gray-200 rounded-full px-5 text-left w-fit py-2 "
                onClick={() => setIsToggle(!isToggle)}
            >
                CREATE NEW THREAD
            </button>
           {isToggle &&
           <>
            <input id="title" value={threadTitle} onChange={e => setThreadTitle(e.target.value)}className='block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Title'></input>
            <MarkdownHandler content={threadContent} setContent={setThreadContent}/>
            <div className='text-xs text-gray-400'>
                At this stage, only image URLs are allowed.
            </div>
            <div id="title" className='p-2.5 w-full text-sm text-gray-700 rounded-lg  flex flex-row gap-2'>
                <div className="w-fit   rounded-full py-1 ">
                    Add tags:   
                </div>
                {tags.map((tag) => {
                    return (<div className="w-fit px-2 rounded-full py-1  bg-gray-200">
                        {tag}
                    </div>)
                })}
            </div>
            <button className='bg-black text-white py-2 rounded-xl' onClick={onSubmit}>CREATE</button>
            <hr className='my-4'/>

            </>}

        </div>
    )
}