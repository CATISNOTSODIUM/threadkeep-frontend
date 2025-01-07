// comment edit modal
import * as React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { filterContent } from '../../utils/save-markdown.ts';

export default function PreviewModal(props: {markdownContent: string, setIsToggle: React.Dispatch<React.SetStateAction<boolean>>, filterStatus: any}) {
    const {markdownContent, setIsToggle, filterStatus} = props;

    return (
        <div data-color-mode="light" className='z-50 fixed top-[16vh] h-[70vh] left-[16vw] w-[70vw] p-10 bg-white rounded-xl shadow-xl '>
            <button className='sticky top-0 text-right bg-gray-100 font-bold rounded-full px-3 hover:text-red-700 hover:bg-red-200' onClick={() => setIsToggle(false)}>
                {"Close ×"}
        </button>
            <MDEditor.Markdown 
                className='w-full my-1 h-3/4 overflow-scroll py-2' source={filterContent(markdownContent, filterStatus)}
                style={{'fontFamily':'"inter", sans-serif', 'backgroundColor':'inherit'}}
            />
        </div>
    )
}

/*
<MDEditor.Markdown 
                className='w-full my-1 h-fit' source={markdownContent}
                style={{'fontFamily':'"inter", sans-serif', 'backgroundColor':'inherit'}}
/>
            */