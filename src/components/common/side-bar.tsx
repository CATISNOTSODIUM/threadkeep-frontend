import * as React from 'react';
import ThreadCard from '../thread/thread-card.tsx';


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
import { Thread } from '../../models/index.ts';
import { threadList } from '../../api/threads.ts';
import { truncateBody } from '../../utils/truncate-body.ts';

export default function SideBar() {
    const [isToggle, setIsToggle] = React.useState(false);
    const name = localStorage.getItem("userName");
    const userID = localStorage.getItem("userID");
    const [ThreadList, setThreadList] = React.useState<Thread[]>([]);
    const fetchThread = async () => {
        const threads = await threadList(0, 5);
        setThreadList(threads);
    };

    React.useEffect(() => {
        fetchThread();
    }, []);

    if (!isToggle) {
        return (<button
            className='opacity-30 hover:opacity-100 fixed top-0 left-0 z-50 w-10 h-full text-center content-center bg-gray-200 drop-shadow-2xl'
            onClick={() => setIsToggle(true)}
        >
            {"⚙️ 🔧"}
        </button>
        )
    } else {
        return (
        <div className='min-w-64 lg:min-w-96 bg-gray-50  overflow-scroll sticky top-24 h-screen rounded-lg px-4 pb-24 flex flex-col gap-1'>
        <button className='sticky top-0 text-right font-bold text-3xl' onClick={() => setIsToggle(false)}>
                {"×"}
        </button>
        <div className='font-bold text-xl'>Your dashboard 🔥</div>
        <div className='bg-white/60 p-5 rounded-xl'>
            <div className='text-base font-bold'>{name?.toUpperCase()}</div>
            <div className='text-xs text-gray-500'>{userID}</div>
            <button onClick={() => {localStorage.removeItem("userID");localStorage.removeItem("userName")}}
                className='text-center w-fit bg-gray-200 font-bold px-5 rounded-full'>
                Log out
            </button>
        </div>


        <DashboardThread initialThreadList={ThreadList.map((thread) => ({
            "title": thread.title,
            "content": thread.content
        }))}/>
        </div>
        )
    }
}


function DashboardThread({initialThreadList: initialThreadList}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [ThreadList, setThreadList] = React.useState(initialThreadList);

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
          <SortableItem key={id.id} id={id} />
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
  const {title, content} = props.id
  return (
    <div ref={setNodeRef}  style={style} {...listeners} {...attributes}>
      <div className='bg-white hover:bg-black/50 hover:text-white rounded-md w-full px-3 py-1 flex flex-row justify-between hover:animate-pulse'>
        <div>
            <div className='font-bold'>{title}</div>
            <div className='text-xs'>
                {truncateBody(content, 30)}
                </div>
        </div>

            
      </div>
      

    </div>
  );
}
/*
import {DndContext, DragOverlay} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';


export default function SideBar() {
  const [items] = React.useState(['1', '2', '3', '4', '5']);
  const [activeId, setActiveId] = React.useState(null);
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className='min-w-64 lg:min-w-96 bg-gray-50  overflow-scroll sticky top-24 h-screen rounded-lg px-4 pb-24 flex flex-col gap-1'>
            {items.map(id =>
            <Draggable key={id} id={id}>
                <div>ITEM {id}</div>
            </Draggable>
            )}
        
        <DragOverlay>
            {activeId ? (
            <div>PICK {activeId}</div>
            ): null}
        </DragOverlay>
        </div>
    </DndContext>
  );
  
}


function Draggable(props) {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: props.id,
  });
  
  return (
    <li ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </li>
  );
}
*/