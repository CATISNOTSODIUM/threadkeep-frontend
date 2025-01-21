import React from "react";
import NavBar from "../components/common/nav-bar.tsx";
import SideBar from "../components/common/side-bar.tsx";
import ThreadCard from "../components/thread/thread-card.tsx";
import { countThread, threadList } from "../api/threads.ts";
import { Thread } from "../models/index.ts";
import { Pagination } from "../components/common/pagination.tsx";
import SearchFilterHandler from "../components/common/search-filter.tsx";
import { getID } from "../utils/getReduxState.ts";

export default function Threads() {
  const [ThreadList, setThreadList] = React.useState<Thread[]>([]);
  const [savedThreadIDList, setSavedThreadIDList] = React.useState<String[]>(
    []
  );
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalThreads, setTotalThreads] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [filter, setFilter] = React.useState({});
  const userID = getID();
  const threadsPerPage = 7;
  const fetchThread = async () => {
    setMessage("Pending ...");

    const savedThreadIDListRequest = await threadList(
      (pageNumber - 1) * threadsPerPage,
      threadsPerPage,
      filter,
      userID ?? ""
    );
    if (!savedThreadIDListRequest.error && savedThreadIDListRequest.data !== undefined) {
      setSavedThreadIDList(
        savedThreadIDListRequest.data.map((thread) => thread.id)
      );
    } else {
      setMessage(savedThreadIDListRequest.error ?? '');
      return;
    }

    const threadsRequest = await threadList(
      (pageNumber - 1) * threadsPerPage,
      threadsPerPage,
      filter
    );
    if (!threadsRequest.error) {

      setThreadList(threadsRequest.data);
    } else {
      setMessage(threadsRequest.error);
      return;
    }

    setMessage("");
  };

  const initPagination = async () => {
    const countThreadRequest = await countThread();
    setTotalThreads(countThreadRequest.data);
  };


  const updateParams = async () => {
    await fetchThread()
    await initPagination()
  }
  React.useEffect(
    () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setPageNumber(1); // reset page number when apply filter
      updateParams();
    }, [filter]
  )

  React.useEffect(
    () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateParams();
    }, [pageNumber]
  )
  return (
    <div >
        <NavBar/>
        <div className='flex flex-row  overflow-y-scroll overflow-x-hidden  mx-4 md:mx-36 lg:mx-48  gap-10'>
            <SideBar />
            <div className='flex flex-col w-full h-[75vh] mt-24'>
                <div className='text-3xl font-bold'>All Threads</div>
                <hr className='mt-2 mb-4'/>
                  <SearchFilterHandler setFilter={setFilter}/>
                  <div className="text-red-500">{message}</div>
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
      <Pagination
        threadsPerPage={threadsPerPage}
        totalThreads={totalThreads}
        currentPageNumber={pageNumber}
        paginate={(pageNumber) => setPageNumber(pageNumber)}
      />
    </div>
  );
}
