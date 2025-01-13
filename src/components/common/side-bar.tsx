import * as React from 'react';

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';


import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {CSS} from '@dnd-kit/utilities';
import { ThreadSimplified } from '../../models/index.ts';
import { threadList } from '../../api/threads.ts';
import { truncateBody } from '../../utils/truncate-body.ts';
import { mergeContent, saveMarkdownAsMD, saveMarkdownAsRawText } from '../../utils/save-markdown.ts';
import PreviewModal from './preview-modal.tsx';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { isVerified } from '../../utils/isVerified.ts';
import { getUser, removeUser } from '../../utils/jwt.ts';

export default function SideBar({spanPage=false}) {
    const navigate = useNavigate();
    if (!isVerified()) navigate("/signin");
    const [isToggle, setIsToggle] = React.useState(spanPage);
    const currentUser = getUser();
    const name = currentUser.name;
    const userID = currentUser.id;
    const [ThreadList, setThreadList] = React.useState<ThreadSimplified[]>([]);
    const fetchThread = async () => {
        const threadsRequest = await threadList(0, 10, {}, userID ?? "");
        if (!threadsRequest.error) {
          const threadListSimplified = threadsRequest.data.map(
            (thread) => ({
              "threadID": thread.id,
              "title": thread.title,
              "content": thread.content, // simplify load
            })
          )
          setThreadList(threadListSimplified);
        } 
        
    };

    const logOut = () => {
      removeUser();
      navigate("/")
    }
    React.useEffect(() => {
        fetchThread();
    }, [isToggle]);

    if (!isToggle) {
        return (<button
            className='fixed opacity-30 hover:opacity-100 top-0 left-0 z-40 w-10 h-full text-center content-center bg-gray-200 drop-shadow-2xl'
            onClick={() => setIsToggle(true)}
        >
            {"⚙️ 🔧"}
        </button>
        )
    } else {
        const styleSpanPage = "w-full h-full px-16 lg:px-96";
        const styleDefault = "border-2 rounded-xl fixed lg:sticky top-24 min-w-64 lg:min-w-96 bg-white  overflow-scroll h-[80vh] rounded-lg p-4 flex flex-col gap-1 z-10";
        return (
        <div className={spanPage ? styleSpanPage : styleDefault}>
        <button className='sticky top-0 right-0 text-right font-bold text-sm' >
                <span className="bg-gray-200 hover:bg-green-300 hover:text-green-800 rounded-full px-3 py-1 mx-1" onClick={() => fetchThread()}>{"  Refresh ↻  "}</span>
                {!spanPage && <span className="bg-gray-200  hover:bg-yellow-300 hover:text-yellow-800 rounded-full px-3 py-1 mx-1" onClick={() => setIsToggle(false)}>{"  Close × "}</span>}
                <button onClick={logOut}
                className='text-center w-fit bg-gray-200 hover:bg-red-200 hover:text-red-800 font-bold px-5 my-2 py-1 rounded-full'>
                Log out </button>
        </button>
        <div className={`font-bold ${spanPage ? "text-4xl" : "text-xl"}`}>Profile</div>
        <div className='bg-white/60 rounded-xl py-2'>
            <div className={`font-bold ${spanPage ? "text-2xl" : "text-sm"}`}>
              {"Username: " + name?.toUpperCase()}
            </div>
            <div className='text-xs text-gray-500'>{userID}</div>
            
        </div>

        <Filter ThreadList={ThreadList}/>
        <div className={`h-full ${spanPage ? "h-full" : "max-h-96"} overflow-scroll`}>
          <hr className='mt-2'/>
          <div className={`p-1 font-bold ${spanPage ? "text-xl" : "text-sm"}`}>Saved Threads</div>
          <div className='text-xs text-gray-400 p-1'>You can swap the order. Make sure to refresh after saving/unsaving threads.</div>
          <DashboardThread ThreadList={ThreadList} setThreadList={setThreadList} triggerRefresh={fetchThread}/>
        </div>
        </div>
        )
    }
}


function Filter({ThreadList}) {
  // checkbox
  const [filterStatus, setFilterStatus] = React.useState({
      "text": true,
      "image": true,
      "code": true
  });
  const [isToggle, setIsToggle] = React.useState(false);
  const [isPreviewToggle, setIsPreviewToggle] = React.useState(false);
  return (
    <div>
      {!isToggle ? <button 
        className="bg-gray-200 hover:bg-green-300 hover:text-green-800 rounded-full px-3 mx-1 text-sm"
        onClick={() => setIsToggle(true)}
      >
        Tool 🛠 </button> : 
      <div className='border-2 duration-500 p-3 bg-white rounded-xl my-2 flex flex-col text-sm lg:text-base'>
          <button className=" bg-gray-200 my-2 hover:bg-red-300 hover:text-red-800 rounded-full px-3 text-sm w-fit" onClick={() => setIsToggle(false)}>
            {"  Close × "}
          </button>
          <div className='font-bold text-xl'>Filter</div>
          <div className='text-xs text-gray-400 my-1'>At this stage, our app only supports text, image, and code snippet.</div>
          <div className='flex justify-start gap-3'>
            {
              Object.entries(filterStatus).map(
                ([name, status]) => {
                  return <div 
                    className={"w-full text-center  rounded-xl px-2 cursor-pointer " + (status ? 'bg-yellow-200' : 'bg-gray-100')}
                    onClick={() => {
                      let tmpStatus = Object.assign({}, filterStatus);
                      tmpStatus[name] = !tmpStatus[name]; 
                      setFilterStatus(tmpStatus);
                    }}
                  >
                    {name}
                  </div>
                }
              )
            }
          </div>
          <hr className='my-2'/>
          <div className='font-bold text-xl'>Output</div>
          <div className='flex flex-row gap-3 '>
            <button className='w-full text-center border-2 rounded-xl px-2' onClick={() => setIsPreviewToggle(true)}>Preview</button>
            <button className='w-full text-center border-2 rounded-xl px-2' onClick={() => saveMarkdownAsMD("output.md", ThreadList, filterStatus)}>MD</button>
            <button className='w-full text-center border-2 rounded-xl px-2' onClick={() => saveMarkdownAsRawText("output.txt", ThreadList, filterStatus)}>TXT</button>
          </div>
        {isPreviewToggle && <PreviewModal markdownContent={mergeContent(ThreadList)} setIsToggle={setIsPreviewToggle} filterStatus={filterStatus}/>}

        </div>
      }
    </div>
  )
}

function DashboardThread({ThreadList, setThreadList, triggerRefresh}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8, // prioritize other buttons than onDrag
    },
  }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setThreadList((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >

      <SortableContext items={ThreadList} strategy={verticalListSortingStrategy}>
        {ThreadList.map((id) => (
          <SortableItem key={id.id} id={id} triggerRefresh={triggerRefresh}/>
        ))}
      </SortableContext>
    </DndContext>
  );
}

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const {title, content, threadID} = props.id
  const navigate = useNavigate();
  return (
    <div ref={setNodeRef}  style={style} {...listeners} {...attributes}>
      <div className='bg-white hover:bg-black/50 hover:text-white rounded-md w-full px-3 py-1 flex flex-row justify-between hover:animate-pulse touch-pan-y'>
        <div 
          className='relative w-full min-h-8 p-1 pr-5 cursor-pointer'
        >
           
            <div className='font-bold text-sm w-full hover:underline' 
                onClick={() => {navigate({
                    pathname: "/thread-display",
                    search: createSearchParams({
                        id: threadID
                    }).toString()
                })}}
            >{title}</div>
            <div className='text-xs w-full'>
                {truncateBody(content, 30)}
            </div>
        </div>

            
      </div>
      

    </div>
  );
}