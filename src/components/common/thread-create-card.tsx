import * as React from 'react';
import MarkdownHandler from './markdown-editor.tsx';
import { Tag, User } from '../../models/index.ts';
import { createNewThread } from '../../api/threads.ts';
import MultipleSelectChip from './multiple-select.tsx';
import { tagList } from '../../api/tags.ts';
import { Pagination } from './pagination.tsx';

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

    const fetchTags = async () => {
        const res = await tagList(); // res is an array
        console.log(res)
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
        const res = await createNewThread(user, threadTitle, threadContent, selectedTags.map(tag => tagsDict[tag]))
        console.log(res)
        window.location.reload(); 
    }

    React.useEffect(() => {
        fetchTags()
    }, [])
    return (
        <div className='flex flex-col w-full text-left gap-2 rounded-xl my-1'>
            <button 
                className="block duration-500 hover:-rotate-1 mb-2 text-base font-bold bg-yellow-200 hover:bg-yellow-300  rounded-full px-5 text-left w-fit py-2 "
                onClick={() => setIsToggle(!isToggle)}
            >
                CREATE NEW THREAD
            </button>
           {isToggle &&
           <>
            <input id="title" value={threadTitle} onChange={e => setThreadTitle(e.target.value)} className='block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Title'></input>
            <div data-color-mode="light">
                <MarkdownHandler content={threadContent} setContent={setThreadContent}/>
            </div>
            <div className='text-xs text-gray-400'>
                At this stage, only image URLs are allowed.
            </div>
            <div id="title" className='p-2.5 w-full text-sm text-gray-700 rounded-lg  flex flex-col gap-2'>
                <div>
                <MultipleSelectChip tags={Object.keys(tagsDict)} selectedTag={selectedTags} setSelectedTag={setSelectedTags}/>
                </div>

            </div>
            <button className='bg-black text-white py-2 rounded-xl' onClick={onSubmit}>CREATE</button>
            <hr className='my-4'/>
            
            </>}
        </div>
    )
}