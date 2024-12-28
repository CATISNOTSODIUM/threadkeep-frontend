import React, { Suspense } from 'react';
import NavBar from '../components/common/nav-bar.tsx'
import SideBar from '../components/common/side-bar.tsx'
import { useSearchParams } from 'react-router-dom';
import { getComments, getThread, isLike, reactionThread, ReactionType } from '../api/threads.ts';
import { Thread, User, Comment } from '../models/index.ts';
import { convertTimeToMessageHistory } from '../utils/message-history.ts';
import MDEditor from '@uiw/react-md-editor';
import CommentCard from '../components/common/comment-card.tsx';
import CommentsCreateCard from '../components/common/comment-create-card.tsx';
import ThreadDisplayCardSkeleton from '../components/common/thread-display-card-skeleton.tsx'
import { Pagination } from '../components/common/pagniation.tsx';


export default function ThreadDisplay() { // fix: remove
    return (
        <Suspense fallback={<ThreadDisplayCardSkeleton/>} >
            <ThreadDisplayHandler/> 
        </Suspense>
    )
} 
// todo: update like when clicked
function ThreadDisplayHandler() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [thread, setThread] = React.useState<Thread>()
    const [comments, setComments] = React.useState<Comment[]>([])
    const [currentLike, setCurrentLike] = React.useState(0)
    const [isToggleLike, setIsToggleLike] = React.useState(false) // fix: must fetch from user
    const currentUser: User = {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? ''
    }
    const fetchThread = async () => {
        const threadID = searchParams.get('id')
        
        if (threadID) {
            const thread = await getThread(currentUser, threadID);
            const {likes} = thread ?? {}
            setCurrentLike(likes)
            setThread(thread)
            const likeStatus = await isLike(currentUser, threadID);
            setIsToggleLike(likeStatus);
        }
    }
    const fetchComments = async () => {
        const threadID = searchParams.get('id')
        if (threadID) {
            const  comments = await getComments(currentUser, threadID);
            setComments(comments)
        }
    }
    React.useEffect(
        () => {
            console.log("USE EFFECT")
            window.scrollTo(0, 0);
            fetchThread();
            fetchComments();
            const threadID = searchParams.get('id')
            if (threadID) reactionThread(currentUser, threadID, ReactionType.VIEW)
        }, []);

    const {title, content, id, user, tags, views, createdAt} = thread ?? {}
    const time = convertTimeToMessageHistory(createdAt);
    return (
        <div>
            
            <NavBar/>
            <div className='flex flex-row min-h-screen  mx-12 lg:mx-12 my-24 gap-10'>
            <SideBar/>
            {thread && 
            <div className='flex flex-col w-2/3 mx-24 lg:mx-48'>  
                <div className='flex flex-row content-center'>
                    <button 
                        className={
                            isToggleLike 
                            ? 'min-w-12 max-h-16 text-center align-center content-center bg-yellow-200 hover:bg-gray-200 hover:text-gray-500 text-yellow-600 mr-5 rounded-xl'
                            : 'min-w-12 max-h-16 text-center align-center content-center bg-gray-100 hover:bg-yellow-200 text-gray-500 mr-5 rounded-xl'
                        }
                        onClick={async () => {
                            const threadID = searchParams.get('id')
                            if (threadID) await reactionThread(currentUser, threadID, !isToggleLike ? ReactionType.LIKE : ReactionType.UNLIKE);
                            setCurrentLike(currentLike + (isToggleLike ? -1 : 1))
                            setIsToggleLike(!isToggleLike)
                        }}
                    >
                        <div>{currentLike} ▲</div>
                    </button>
                    <div className='flex flex-col'>
                        <div className='text-base'>
                        {user?.name} 
                        {"  : "}
                        <span className='font-bold'>
                            {time}
                        </span>
                        {(user?.name === currentUser.name) && <span>
                            <button className='text-red-600 ml-3'>✎ Edit </button>
                            <button className='text-red-600 ml-3'>🗑 Delete </button>
                        </span>}
                        <div className='text-3xl w-full font-bold text-wrap'>{title}</div>
                            <div className='flex flex-row text-xs gap-2 font-mono'>
                                {tags?.map((tag) => {
                                    return (<div key={tag.id} className="w-fit px-2 rounded-full py-1  bg-yellow-200 text-yellow-800">
                                        {tag.name}
                                    </div>)
                                })}
                            </div>
                    </div>
                </div>
                </div>
                <div data-color-mode="light">
                <MDEditor.Markdown 
                    className='w-full my-5 h-fit' source={content}
                    style={{'fontFamily':'"inter", sans-serif'}}
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
                
                <CommentsCreateCard threadID = {id ?? ''} fetchComments={fetchComments}/>
                </div>
                
            </div>
            }
            </div>
        </div>
    );
}