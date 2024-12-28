import * as React from 'react';
import {Thread, User} from '../../models'
import { convertTimeToMessageHistory } from '../../utils/message-history.ts';
import { truncateBody } from '../../utils/truncate-body.ts';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd'

const CARD = "container"
const name = "container"
export default function ThreadCard(props: Thread) {
    const navigate = useNavigate();
    const {title, content, id, user, likes, views, createdAt, tags} = props
    const time = convertTimeToMessageHistory(createdAt);

    const [dragStyle, dragRef] = useDrag(
        () => ({
            type: CARD,
            item: {name} ,
            collect: (monitor) => {
                return {
                    "opacity": monitor.isDragging() ? 0.7 : 1,
                };
            }
        }),
        []
    )
    const currentUser: User = {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? ''
    }
    return (
        <button  
            ref={dragRef} style={dragStyle}
            onClick={() => {navigate({
                pathname: "/thread-display",
                search: createSearchParams({
                    id: id
                }).toString()
            })}}
            className='focus:cursor-pointer flex flex-col w-full text-left hover:bg-yellow-50 rounded-xl p-5'
        >
            <div className='text-xs'>
                {user.name} 
                {"  : "}
                <span className='font-bold'>
                    {time}
                </span>
                {(user.name === currentUser.name) && <button className='text-red-600 ml-3'>✎ Edit </button>}
            </div>
            
            <div className='text-xl font-bold text-yellow-950'>
                {title}
            </div>
            <div className='flex flex-row text-xs gap-2 font-mono'>
                {tags.map((tag) => {
                    return (<div key={tag.id} className="w-fit px-2 rounded-full py-1  bg-yellow-200 text-yellow-800">
                        {tag.name}
                    </div>)
                })}
            </div>
            <div className='text-sm text-gray-500 '>
                <pre className='pr-24 whitespace-pre-wrap font-sans'>{truncateBody(content)}</pre>
            </div>
            
            <div className='text-sm'>
                {" 🖤 " + likes}{" 👁️‍🗨️ " + views}
            </div>
        </button>
    )
}