import React from 'react';
import NavBar from '../components/common/nav-bar.tsx'
import SideBar from '../components/common/side-bar.tsx'
import ThreadCard from '../components/common/thread-card.tsx';
import ThreadCreateCard from '../components/common/thread-create-card.tsx';
import { threadList } from '../api/threads.ts';
import { Thread } from '../models/index.ts';


export default function Threads() {

  const [ThreadList, setThreadList] = React.useState([])
  const fetchThread = async () => {
    const threads = await threadList()
    
    setThreadList(threads);
  }
  React.useEffect(
    () => {
      fetchThread()
    }, []
  )
  return (
    <div>
        <NavBar/>
        <div className='flex flex-row min-h-screen  mx-12 lg:mx-12 my-24 gap-10'>
            <SideBar/>
            <div className='flex flex-col h-full w-full '>
                <div className='text-3xl font-bold'>THREADS</div>
                <hr className='my-4'/>
                {
                  ThreadList.map((thread) => 
                    thread &&
                    <ThreadCard {...(thread as object as Thread)}/>
                  )
                }
            </div>
        </div>

    </div>
  );
}

