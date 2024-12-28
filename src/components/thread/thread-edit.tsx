// comment edit modal
import * as React from 'react';
import {Thread, User} from '../../models/index.ts'
import MarkdownHandler from '../common/markdown-editor.tsx';
import { updateThread } from '../../api/threads.ts';

export default function ThreadEditModal(props: {threadProps: Thread, setIsToggle: React.Dispatch<React.SetStateAction<boolean>>}) {
    const {threadProps, setIsToggle} = props;
    const {content, title, id} = threadProps;
    const [threadContent, setThreadContent] = React.useState(content);
    const [threadTitle, setThreadTitle] = React.useState(title);
    const currentUser: User = {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? ''
    }
    const submitThread = async () => {
        await updateThread(id, currentUser, threadTitle, threadContent);
        setIsToggle(false);
    }
    return (
        <div data-color-mode="light" className='fixed top-1/6 left-1/6 w-2/3 min-h-1/2 h-fit  z-50 p-10 bg-white rounded-xl shadow-xl'>
            <div className='text-xl font-bold'>Thread editor</div>
            <button className='bg-yellow-200 font-bold text-black py-2 w-1/4 mr-2 my-2 rounded-full' onClick={submitThread}>Submit</button>
            <button className='bg-yellow-100 font-bold text-black py-2 w-1/4 mr-2 my-2 rounded-full' onClick={() => setIsToggle(false)}>Cancel</button>
            <input id="title" value={threadTitle} onChange={e => setThreadTitle(e.target.value)} className='block p-2.5 my-1 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Title'></input>
            <MarkdownHandler content={threadContent} setContent={setThreadContent}/>
            
        </div>
    )
}