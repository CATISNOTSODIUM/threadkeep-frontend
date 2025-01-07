import * as React from 'react';
import {Thread, User} from '../../models/index.ts'
import { convertTimeToMessageHistory } from '../../utils/message-history.ts';
import { truncateBody } from '../../utils/truncate-body.ts';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { reactionThread } from '../../api/threads.ts';

const CARD = "container"
const name = "container"
export default function ThreadCard(props: Thread) {
    const navigate = useNavigate();
    const {title, content, id, user, likes, views, createdAt, tags, isSaved} = props
    const time = convertTimeToMessageHistory(createdAt);

    const currentUser: User = {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? ''
    }
    return (
        <div  
            className='focus:cursor-pointer duration-300 hover:-translate-x-1 flex flex-col w-full text-left hover:bg-gray-50 rounded-xl p-5'
        >
            <button 
                className={"text-sm bg-gray-200 w-fit px-2 my-1 rounded-xl duration-500 "} // todo:  + (isSaved ? "opacity-100 hover:opacity-20" : "opacity-20 hover:opacity-100")
                onClick={() => reactionThread(currentUser, id, 3)}
            >
                Saved 💾
            </button>

            <div className='text-xs'>
                {user.name} 
                {"  : "}
                <span className='font-bold'>
                    {time}
                </span>
                {(user.name === currentUser.name) && <button className='text-red-600 ml-3'>✎ Edit </button>}
            </div>
            <button className='text-left' 
            onClick={() => {navigate({
                pathname: "/thread-display",
                search: createSearchParams({
                    id: id
                }).toString()
            })}}>
            <div className='text-xl font-bold text-gray-950'>
                {title}
            </div>
            <div className='flex flex-row text-xs gap-2 font-mono'>
                {tags.map((tag) => {
                    return (<div key={tag.id} className="w-fit px-2 rounded-full py-1  bg-gray-200 text-gray-800">
                        {tag.name}
                    </div>)
                })}
            </div>
            
            <div className='text-sm text-gray-500 '>
                <div className='pr-24 whitespace-pre-wrap'>{truncateBody(content, 200)}</div>
            </div>
            </button>
            <div className='text-sm'>
                {" ⬢ " + likes}{" 👁️‍🗨️ " + views}
            </div>
        </div>
    )
}