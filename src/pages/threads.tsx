import React from 'react';
import NavBar from '../components/common/nav-bar.tsx'
import SideBar from '../components/common/side-bar.tsx'
import ThreadCard from '../components/thread/thread-card.tsx';
import ThreadCreateCard from '../components/thread/thread-create-card.tsx';
import { countThread, threadList } from '../api/threads.ts';
import { Thread, User } from '../models/index.ts';
import { Pagination } from '../components/common/pagination.tsx';
import { isVerified } from '../utils/isVerified.ts';
import { useNavigate } from 'react-router-dom';
import SearchFilterHandler from '../components/common/search-filter.tsx';


export default function Threads() {
  const navigate = useNavigate();
  const [ThreadList, setThreadList] = React.useState<Thread[]>([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [totalThreads, setTotalThreads] = React.useState(0)
  const [filter, setFilter] = React.useState({});

  const threadsPerPage = 7;
  const fetchThread = async () => {
    const threads = await threadList((pageNumber - 1) * threadsPerPage, threadsPerPage, filter)
    setThreadList(threads);
  }

  const initPagination = async () => {
    setTotalThreads(await countThread())
  }

  React.useEffect(
    () => {
      if (!isVerified()) {
        navigate("/signin");
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchThread()
      initPagination()
    }, [pageNumber, filter]
  )

  if (!isVerified()) {
    return <div></div>
  }
  return (
    <div>
        <NavBar/>
        <div className='flex flex-row  overflow-y-scroll overflow-x-hidden  mx-4 md:mx-12 lg:mx-12  gap-10'>
            <SideBar/>
            
            <div className='flex flex-col w-full h-[75vh] mt-24'>
                <div className='text-3xl font-bold'>All Threads</div>
                <ThreadCreateCard/>
                <SearchFilterHandler setFilter={setFilter}/>
                <hr className='mt-2 mb-4'/>
                
                  {
                    ThreadList
                    .sort((thread1, thread2) => Date.parse(thread2.updatedAt) -  Date.parse(thread1.updatedAt))
                    .map((thread) => 
                      thread &&
                      <ThreadCard {...(thread as object as Thread)}/>
                    )
                  }
            </div>
            
        </div>
        <Pagination threadsPerPage={threadsPerPage} totalThreads={totalThreads} currentPageNumber={pageNumber} paginate={(pageNumber) => setPageNumber(pageNumber)}/>
    </div>
  );
}

