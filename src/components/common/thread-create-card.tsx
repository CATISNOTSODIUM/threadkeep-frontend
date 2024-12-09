import * as React from 'react';

export default function ThreadCreateCard() {
    const tags = ["RANT", "STUDIES"]
    return (
        <div className='flex flex-col w-full text-left gap-2'>
           
           
            <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                CREATE NEW THREAD
            </label>
            <div className='flex flex-row gap-2 my-2'>
                <button className='rounded-full px-3 py-1 text-sm bg-slate-300'>Edit</button>
                <button className='rounded-full px-3 py-1 text-sm bg-slate-100'>Attach files</button>
                <button className='rounded-full px-3 py-1 text-sm bg-slate-100'>Preview</button>
                
            </div>
            <input id="title" className='block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Title'></input>

            <textarea id="message" className="block resize-none p-2.5 w-full min-h-24 text-sm text-gray-700 bg-gray-50 rounded-lg border " 
            placeholder="Write your thoughts here...">
            </textarea>
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