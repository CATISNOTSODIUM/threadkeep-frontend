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
        
        const threadRequest = await createNewThread(user, threadTitle, threadContent, selectedTags.map(tag => tagsDict[tag]))
        if (threadRequest.error) {
            setMessage(threadRequest.error)
        } else {
            window.location.reload(); 
        }
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
           <div className="flex flex-row">
                <input id="title" value={threadTitle} onChange={e => setThreadTitle(e.target.value)} 
                    className='block p-3 w-full text-sm text-black bg-white rounded-md mr-2 border-2 ' 
                    placeholder='Title (Max character 100)'>
                </input>
                <MultipleSelectChip tags={Object.keys(tagsDict)} selectedTag={selectedTags} setSelectedTag={setSelectedTags}/>
           </div>
            
            <div data-color-mode="light">
                <MarkdownHandler content={threadContent} setContent={setThreadContent}/>
            </div>
            <button className='bg-white w-fit border-2 text-black hover:animate-pulse py-2 px-3 rounded-full' onClick={onSubmit}>Start your discussion 🐝</button>

            <div className='text-xs text-red-400'>
                {message}
            </div>


            </>}
        </div>
    )
}