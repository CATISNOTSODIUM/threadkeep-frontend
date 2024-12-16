import * as React from 'react';
import NavBar from '../components/common/nav-bar.tsx';
import SideBar from '../components/common/side-bar.tsx';
import ThreadCard from '../components/common/thread-card.tsx';

export default function Profile() {
    const name = localStorage.getItem("userName");
    const userID = localStorage.getItem("userID");
    return (
    <div className=''>
        <NavBar/>
        <div className='h-full  flex flex-row  mx-12 lg:mx-12 my-24 gap-10'>
            <div className='flex flex-col h-full w-full border-2 rounded-md py-10'>
                
                <div className='px-10 py-10'>
                    <div className='text-3xl font-bold '>{name}</div>
                    <div className='text-sm text-gray-500'>UserID: {userID}</div>
                </div>
                <div className='flex flex-row my-2'>
                    <button className='w-full px-3 py-1 text-sm bg-slate-300'>Posts</button>
                    <button className='w-full px-3 py-1 text-sm bg-slate-100'>Comments</button>
                    <button className='w-full px-3 py-1 text-sm bg-slate-100'>Dashboard</button>
                </div>
                <div className='px-10 py-10  h-full'>
                   
                </div>
            </div>
        </div>
        
    </div>
    )
}