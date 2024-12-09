import * as React from 'react';
import ThreadCard from './thread-card.tsx';

export default function SideBar() {
    const [isToggle, setIsToggle] = React.useState(false);
    if (!isToggle) {
        return (<button
            className='opacity-30 hover:opacity-100 fixed top-0 left-0 z-50 w-10 h-full text-center content-center bg-gray-200 drop-shadow-2xl'
            onClick={() => setIsToggle(true)}
        >
            {">"}
        </button>
        )
    } else {
        return (<div className='bg-gray-100 rounded-lg px-10 py-5 min-w-64 text-center'>
        <div className='text-base'> DASHBOARD </div>
        <div className='text-base'> SAVED THREADS </div>

            <button className='' onClick={() => setIsToggle(false)}>
                {"<<"}
            </button>

        </div>)
    }
}