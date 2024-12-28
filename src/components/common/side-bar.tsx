import * as React from 'react';
import ThreadCard from './thread-card.tsx';

export default function SideBar() {
    const [isToggle, setIsToggle] = React.useState(false);
    const name = localStorage.getItem("userName");
    const userID = localStorage.getItem("userID");
    if (!isToggle) {
        return (<button
            className='opacity-30 hover:opacity-100 fixed top-0 left-0 z-50 w-10 h-full text-center content-center bg-gray-200 drop-shadow-2xl'
            onClick={() => setIsToggle(true)}
        >
            {"⚙️ 🔧"}
        </button>
        )
    } else {
        return (<div className='overflow-scroll sticky top-24 h-screen border-bg-gray-100 border-2 rounded-lg px-4 pb-24 min-w-64 flex flex-col gap-2'>
        <button className='sticky top-0 text-right font-bold text-3xl' onClick={() => setIsToggle(false)}>
                {"×"}
        </button>
        <div className='text-xl font-bold'>{name?.toUpperCase()}</div>
        <div className='text-xs text-gray-500'>{userID?.slice(0, 8)}...</div>
        <button onClick={() => {localStorage.removeItem("userID");localStorage.removeItem("userName")}}className='text-center w-full bg-yellow-300 font-bold px-3 py-1 rounded-full'>Log out</button>
        
        <div className='border-2 border-yellow-400 bg-yellow-200 flex flex-row gap-1 rounded-xl'>
            <div className='bg-white px-1 w-8 rounded-full cursor-pointer'>🖼️</div>
            <div className='bg-white px-1 w-8 rounded-full cursor-pointer'>⌨️</div>
        </div>

        <button className='w-full font-bold bg-gray-100 px-3 py-1 text-center rounded-full'>Saved threads I 📋</button>
            <div className='overflow-scroll min-h-48'>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            </div>
        <button className='w-full font-bold bg-gray-100 px-3 py-1 text-center rounded-full'>Saved threads I 📋</button>
            <div className='overflow-scroll min-h-48'>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            <div className='w-full text-pretty max-w-full border-2 border-gray-100 rounded-full  text-center text-sm'>How similar is Rust to C++ in terms of safety</div>
            </div>

        </div>)
    }
}