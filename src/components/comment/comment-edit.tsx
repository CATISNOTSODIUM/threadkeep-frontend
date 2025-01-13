// comment edit modal
import * as React from 'react';
import {Comment, User} from '../../models/index.ts'
import MarkdownHandler from '../common/markdown-editor.tsx';
import { updateComment } from '../../api/threads.ts';
import { getUser } from '../../utils/jwt.ts';

export default function CommentEditModal(props: {commentProps: Comment, setIsToggle: React.Dispatch<React.SetStateAction<boolean>>}) {
    const {commentProps, setIsToggle} = props;
    const {content, id, user, likes, views, createdAt} = commentProps;
    const [commentsContent, setCommentsContent] = React.useState(content);
    const tags = []
    const currentUser: User = getUser();
    const submitComment = async () => {
        await updateComment(id, currentUser, commentsContent);
        setIsToggle(false);
        window.location.reload();

    }
    return (
        <div data-color-mode="light" className='fixed top-1/4 left-1/6 w-2/3 min-h-1/2 h-fit  z-50 p-10 bg-white rounded-xl shadow-xl'>
            <div className='text-xl font-bold'>Comment editor</div>
            <MarkdownHandler content={commentsContent} setContent={setCommentsContent}/>
            <button className='bg-yellow-200 font-bold text-black py-2 w-1/4 mr-2 my-2 rounded-full' onClick={submitComment}>Submit</button>
            <button className='bg-yellow-100 font-bold text-black py-2 w-1/4 mr-2 my-2 rounded-full' onClick={() => setIsToggle(false)}>Cancel</button>
        </div>
    )
}