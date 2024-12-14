import * as React from 'react';
import MarkdownHandler from './markdown-editor.tsx';

export default function ThreadCreateCard() {
    const tags = []
    const [threadContent, setThreadContent] = React.useState("");
    return (
        <div className='flex flex-col w-full text-left gap-2'>
           
           
            <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                CREATE NEW THREAD
            </label>
            <input id="title" className='block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Title'></input>
            <MarkdownHandler content={threadContent} setContent={setThreadContent}/>
            <div className='text-xs text-gray-400'>
                At this stage, only image URLs are allowed.
            </div>
            <div id="title" className='block p-2.5 w-full text-sm text-gray-700 rounded-lg  flex flex-row gap-2'>
                <div className="w-fit   rounded-full py-1 ">
                    Add tags:   
                </div>
                {tags.map((tag) => {
                    return (<div className="w-fit px-2 rounded-full py-1  bg-gray-200">
                        {tag}
                    </div>)
                })}
            </div>
            
            <hr className='my-4'/>
        </div>
    )
}