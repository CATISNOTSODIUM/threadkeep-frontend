import React from 'react';
import NavBar from '../components/common/nav-bar.tsx'
import SideBar from '../components/common/side-bar.tsx'
import { useSearchParams } from 'react-router-dom';
import { getComments, getThread } from '../api/threads.ts';
import { Thread, User, Comment } from '../models/index.ts';
import { convertTimeToMessageHistory } from '../utils/message-history.ts';
import MDEditor from '@uiw/react-md-editor';
import CommentCard from '../components/common/comment-card.tsx';
import CommentsCreateCard from '../components/common/comment-create-card.tsx';


export default function ThreadDisplay() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [thread, setThread] = React.useState<Thread>()
    const [comments, setComments] = React.useState<Comment[]>([])
    const currentUser: User = {
        id: "eba95d09-0daf-42b5-8be9-ce09f9022d7b",
        name: "CAT SODIUM"
    }

    const fetchThread = async () => {
        const threadID = searchParams.get('id')
        if (threadID) {
            const thread = await getThread(currentUser, threadID);
            const  comments = await getComments(currentUser, threadID);
            setThread(thread)
            setComments(comments)
        }
    }
    React.useEffect(
        () => {
        window.scrollTo(0, 0);
        fetchThread();
        }, []
    )

    const {title, content, id, user, likes, views, createdAt} = thread ?? {}
    const tags = []
    const time = convertTimeToMessageHistory(createdAt);
    return (
        <div>
            <NavBar/>
            <div className='flex flex-row min-h-screen  mx-12 lg:mx-12 my-24 gap-10'>
            <SideBar/>
            {thread && 
            <div className='flex flex-col w-full mx-24 lg:mx-48'>  
                <div className='flex flex-row'>
                    <div className='w-12 text-center align-center content-center bg-blue-100 text-blue-500 mr-5 rounded-xl'>
                        <div>{likes} ▲</div>
                        <hr/>
                        <div>{views} 👁</div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-base'>
                        {user?.name} 
                        {"  : "}
                        <span className='font-bold'>
                            {time}
                        </span>
                        <div className='text-3xl font-bold'>{title}</div>
                    </div>
                </div>
                </div>
                <MDEditor.Markdown 
                    className='w-full my-5 h-fit' source={content}
                    style={{'fontFamily':'"Poppins", sans-serif'}}
                />
                <hr className='my-3'/>
                <div className='font-bold text-xl'>COMMENTS</div>
                    {comments.length > 0 ?
                        comments?.map(comment => 
                        (
                           <CommentCard {...comment} />
                        ))
                        : <div className='text-gray-500 text-sm py-3'>No comments</div>
                    }
                
                <CommentsCreateCard threadID = {id ?? ''}/>
            </div>
            }
            
            </div>
            
        </div>
    );
}

