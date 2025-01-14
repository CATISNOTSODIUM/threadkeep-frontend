import React from 'react';
import NavBar from '../components/common/nav-bar.tsx'
import SideBar from '../components/common/side-bar.tsx'
import ThreadCard from '../components/thread/thread-card.tsx';
import ThreadCreateCard from '../components/thread/thread-create-card.tsx';
import { countThread, threadList } from '../api/threads.ts';
import { Thread } from '../models/index.ts';
import { Pagination } from '../components/common/pagination.tsx';
import SearchFilterHandler from '../components/common/search-filter.tsx';
import { getID } from '../utils/getReduxState.ts';


export default function Threads() {
  const [ThreadList, setThreadList] = React.useState<Thread[]>([])
  const [savedThreadIDList, setSavedThreadIDList] = React.useState<String[]>([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [totalThreads, setTotalThreads] = React.useState(0)
  const [filter, setFilter] = React.useState({});
  const userID = getID();
  const threadsPerPage = 7;
  const fetchThread = async () => {
    const threads = await threadList((pageNumber - 1) * threadsPerPage, threadsPerPage, filter);
    const _savedThreadIDList = await threadList((pageNumber - 1) * threadsPerPage, threadsPerPage, filter, userID ?? '') ?? []; 
    setSavedThreadIDList(_savedThreadIDList.map(thread => thread.id));
    setThreadList(threads);
  }

  const initPagination = async () => {
    setTotalThreads(await countThread())
  }

  React.useEffect(
    () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchThread()
      initPagination()
    }, [pageNumber, filter]
  )

  return (
    <div >
        <NavBar/>
        <div className='flex flex-row  overflow-y-scroll overflow-x-hidden  mx-4 md:mx-36 lg:mx-48  gap-10'>
            <SideBar />
            <div className='flex flex-col w-full h-[75vh] mt-24'>
                <ThreadCreateCard/>
                <div className='text-3xl font-bold'>All Threads</div>
                <hr className='mt-2 mb-4'/>
                <SearchFilterHandler setFilter={setFilter}/>
                  {
                    ThreadList ?
                    ThreadList
                    .sort((thread1, thread2) => Date.parse(thread2.updatedAt) -  Date.parse(thread1.updatedAt))
                    .map((thread) => {
                      thread["isSaved"] = savedThreadIDList.indexOf(thread.id) > -1
                      return thread;
                    }).map((thread) => 
                      thread &&
                      <ThreadCard key={thread.id} {...(thread as object as Thread)}/>
                    ) : <div>cannot load threads</div>
                  }
            </div>
            
        </div>
        <Pagination threadsPerPage={threadsPerPage} totalThreads={totalThreads} currentPageNumber={pageNumber} paginate={(pageNumber) => setPageNumber(pageNumber)}/>
    </div>
  );
}

