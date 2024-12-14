import * as React from 'react';
import {Thread} from '../../models'
import { convertTimeToMessageHistory } from '../../utils/message-history.ts';

export default function ThreadCard(props: Thread) {
    const {title, content, user, likes, views, createdAt} = props
    const tags = []
    const time = convertTimeToMessageHistory(createdAt);
    return (
        <div className='flex flex-col w-full text-left '>
            <div className='text-xs'>
                {user.name} 
                {"  : "}
                <span className='font-bold'>
                    {time}
                </span>
            </div>
            
            <div className='text-xl font-bold'>
                {title}
            </div>
            <div className='flex flex-row text-xs gap-2'>
                {tags.map((tag) => {
                    return (<div className="w-fit px-2 rounded-full py-1  bg-gray-200">
                        {tag}
                    </div>)
                })}
            </div>
            <div className='text-sm text-gray-500 '>
                {content}
            </div>
            <div className='text-sm'>
                {" ▲ " + likes}{" 👁 " + views}
            </div>
            <hr className='my-4'/>
        </div>
    )
}