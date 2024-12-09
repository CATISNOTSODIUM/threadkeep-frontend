import React from 'react';
import NavBar from '../components/common/nav-bar.tsx'
import SideBar from '../components/common/side-bar.tsx'
import ThreadCard from '../components/common/thread-card.tsx';
import ThreadCreateCard from '../components/common/thread-create-card.tsx';
export default function Threads() {
  return (
    <div>
        <NavBar/>
        <div className='flex flex-row min-h-screen  mx-12 lg:mx-12 my-24 gap-10'>
            <SideBar/>
            <div className='flex flex-col h-full w-full '>
                <div className='text-3xl font-bold'>THREADS</div>
                <hr className='my-4'/>
                <ThreadCreateCard/>
                <ThreadCard/>
                <ThreadCard/>
            </div>
        </div>

    </div>
  );
}

