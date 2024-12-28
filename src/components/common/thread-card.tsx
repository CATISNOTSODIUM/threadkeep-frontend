import * as React from 'react';
import {Thread, User} from '../../models'
import { convertTimeToMessageHistory } from '../../utils/message-history.ts';
import { truncateBody } from '../../utils/truncate-body.ts';
import { createSearchParams, useNavigate } from 'react-router-dom';

const CARD = "container"
const name = "container"
export default function ThreadCard(props: Thread) {
    const navigate = useNavigate();
    const {title, content, id, user, likes, views, createdAt, tags} = props
    const time = convertTimeToMessageHistory(createdAt);

    const currentUser: User = {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? ''
    }
    return (
        <div  
            className='focus:cursor-pointer duration-300 hover:-translate-x-1 flex flex-col w-full text-left hover:bg-gray-50 rounded-xl p-5'
        >
            <button className='text-sm bg-gray-200 w-fit px-2 my-1 rounded-xl hover:-translate-x-1 duration-500'>
                🔖 dashboard
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
                <pre className='pr-24 whitespace-pre-wrap font-sans'>{truncateBody(content)}</pre>
            </div>
            </button>
            <div className='text-sm'>
                {" ⬢ " + likes}{" 👁️‍🗨️ " + views}
            </div>
        </div>
    )
}