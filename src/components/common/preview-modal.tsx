// comment edit modal
import * as React from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function PreviewModal(props: {markdownContent: string, setIsToggle: React.Dispatch<React.SetStateAction<boolean>>}) {
    const {markdownContent, setIsToggle} = props;

    return (
        <div data-color-mode="light" className='z-50 fixed top-[16vh] h-[70vh] left-[16vw] w-[70vw] p-10 bg-white rounded-xl shadow-xl '>
            <button className='sticky top-0 text-right font-bold text-3xl' onClick={() => setIsToggle(false)}>
                {"×"}
        </button>
            <MDEditor.Markdown 
                className='w-full my-1 h-full overflow-scroll py-2' source={markdownContent}
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