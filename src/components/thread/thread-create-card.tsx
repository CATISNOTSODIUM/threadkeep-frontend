import * as React from 'react';
import MarkdownHandler from '../common/markdown-editor.tsx';
import { Tag, User } from '../../models/index.ts';
import { createNewThread } from '../../api/threads.ts';
import MultipleSelectChip from '../common/multiple-select.tsx';
import { tagList } from '../../api/tags.ts';
import { Pagination } from '../common/pagination.tsx';

export default function ThreadCreateCard() {
    const user: User = {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? ''
    }
    const [tagsDict, setTagsDict] = React.useState<{[name: string] : Tag}>({})
    const [isToggle, setIsToggle] = React.useState(false);
    const [threadTitle, setThreadTitle] = React.useState("");
    const [threadContent, setThreadContent] = React.useState("");
    const [selectedTags, setSelectedTags] = React.useState<Tag[]>([])

    // message status
    const [message, setMessage] = React.useState("At this stage, only image URLs are allowed.")
    const fetchTags = async () => {
        const res = await tagList(); // res is an array
        try {
            const tmp = {}
            res.forEach(tag => {
                tmp[tag.name] = tag
            });
            setTagsDict(tmp)
        } catch (e) {
            console.log(e)
        }
        
        
    }
    const onSubmit = async () => {
        if (threadTitle.length > 100) {
            setMessage("Title should not exceed 100 characters.")            
            return;
        }
        if (threadTitle === '' || threadContent === '') {
            setMessage("Title and content must not be empty.")            
            return;
        }
        
        const res = await createNewThread(user, threadTitle, threadContent, selectedTags.map(tag => tagsDict[tag]))
        window.location.reload(); 
    }

    React.useEffect(() => {
        fetchTags()
    }, [])
    return (
        <div className='flex flex-col w-full text-left gap-2 rounded-xl my-1 px-3'>
            <button 
                className="block duration-500 mb-2 text-base font-bold bg-yellow-200 hover:bg-yellow-300  rounded-full px-5 text-left w-fit py-2 "
                onClick={() => setIsToggle(!isToggle)}
            >
                CREATE
            </button>
           {isToggle &&
           <>
            <button className='bg-white border-2 hover:bg-gray-50 text-black py-2 rounded-full' onClick={onSubmit}>Start your discussion 🐝</button>
            <input id="title" value={threadTitle} onChange={e => setThreadTitle(e.target.value)} className='block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border ' 
                placeholder='Title (Max character 100)'>
            </input>
            <div data-color-mode="light">
                <MarkdownHandler content={threadContent} setContent={setThreadContent}/>
            </div>
            <div className='text-xs text-red-400'>
                {message}
            </div>
            <div id="title" className='p-2.5 font-mono w-full text-sm text-gray-700 rounded-lg  flex flex-col gap-2 overflow-y-scroll'>
                <div>
                <MultipleSelectChip tags={Object.keys(tagsDict)} selectedTag={selectedTags} setSelectedTag={setSelectedTags}/>
                </div>

            </div>

            </>}
        </div>
    )
}