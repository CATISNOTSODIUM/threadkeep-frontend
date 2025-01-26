import * as React from 'react';
import NavBar from '../components/common/nav-bar.tsx';
import ThreadCreateCard from "../components/thread/thread-create-card.tsx";
import { getUser, removeUser } from '../utils/jwt.ts';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Button, Card, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Tooltip, useDisclosure } from '@chakra-ui/react';
import PreviewModal from '../components/common/preview-modal.tsx';
import { mergeContent, saveMarkdownAsMD, saveMarkdownAsRawText } from '../utils/save-markdown.ts';
import { threadList } from '../api/threads.ts';
import { ThreadSimplified } from '../models/index.ts';
import { createSearchParams, redirect, useNavigate } from 'react-router-dom';
import { truncateBody } from '../utils/truncate-body.ts';

export default function Profile() {
  const currentUser = getUser();
  const name = currentUser.name;
  const userID = currentUser.id;
  const logOut = () => {
    removeUser();
    redirect("/");
  };
  const [ThreadList, setThreadList] = React.useState<ThreadSimplified[]>([]);
  const fetchThread = async () => {
    const threadsRequest = await threadList(0, 10, {}, userID ?? "");
    if (!threadsRequest.error && threadsRequest.data !== undefined) {
      const threadListSimplified = threadsRequest.data.map((thread) => ({
        threadID: thread.id,
        title: thread.title,
        content: thread.content, // simplify load
      }));
      setThreadList(threadListSimplified);
    }
  };
  React.useEffect(() => {
      fetchThread();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="text-white bg-gradient-to-bl from-black to-gray-900 flex flex-col min-h-screen justify-center px-16 lg:px-64 border-none">
          <NavBar />
          <div className="text-2xl lg:text-6xl my-3 text-wrap" id="logo">
            {name}
          </div>
          <div className="text-xs text-wrap" id="logo">
            {userID}
          </div>
          <Button onClick={logOut} colorScheme="red" variant={"outline"} className='my-1 w-fit'>
              Log out{" "}
            </Button>
          <HStack className='my-1'>
            
            <ThreadCreateCard/>
            <Filter ThreadList={ThreadList}/>
          </HStack>
          <Card className='flex flex-col gap-2 p-3'>
            <div className='text-gray-500 text-sm'>
              Saved threads (You can drag the cards to swap positions)
            </div>
            <DashboardThread
              ThreadList={ThreadList}
              setThreadList={setThreadList}
              triggerRefresh={fetchThread}
            />
          </Card>
        </div>
  );
}


function Filter({ ThreadList }) {
  // checkbox
  const [filterStatus, setFilterStatus] = React.useState({
    text: true,
    image: true,
    code: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen} colorScheme="blue">
        💾 Download threads
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
          <div className="font-bold text-xl">Filter</div>
          <div className="flex justify-start gap-3">
            {Object.entries(filterStatus).map(([name, status]) => {
              return (
                <Button
                  colorScheme={status ? "yellow" : "blackAlpha"}
                  onClick={() => {
                    let tmpStatus = Object.assign({}, filterStatus);
                    tmpStatus[name] = !tmpStatus[name];
                    setFilterStatus(tmpStatus);
                  }}
                  size="sm"
                >
                  {name}
                </Button>
              );
            })}
          </div>
          <div className="text-xs text-gray-400 my-1">
            At this stage, our app only supports text, image, and code snippet.
          </div>
          <div className="font-bold text-xl">Download</div>
          <div className="flex flex-row gap-3 mb-3">
            <PreviewModal
                markdownContent={mergeContent(ThreadList)}
                filterStatus={filterStatus}
            />
            <Button
              colorScheme="blackAlpha"
              size="sm"
              onClick={() =>
                saveMarkdownAsMD("output.md", ThreadList, filterStatus)
              }
            >
              <Tooltip label="Save as markdown (.md)">MD</Tooltip>
            </Button>
            <Button
              colorScheme="blackAlpha"
              size="sm"
              onClick={() =>
                saveMarkdownAsRawText("output.txt", ThreadList, filterStatus)
              }
            >
              <Tooltip label="Save as text (.txt)">TXT</Tooltip>
            </Button>
          </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}


function DashboardThread({ ThreadList, setThreadList, triggerRefresh }) {
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
      <SortableContext
        items={ThreadList}
        strategy={verticalListSortingStrategy}
      >
        {ThreadList.map((id) => (
          <SortableItem key={id.id} id={id} triggerRefresh={triggerRefresh} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { title, content, threadID } = props.id;
  const navigate = useNavigate();
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className="p-4">
        <div className="relative w-full min-h-8 p-1 pr-5 cursor-pointer">
          <div
            className="font-bold text-sm w-full hover:underline"
            onClick={() => {
              navigate({
                pathname: "/thread-display",
                search: createSearchParams({
                  id: threadID,
                }).toString(),
              });
            }}
          >
            {title}
          </div>
          <div className="text-xs w-full">{truncateBody(content, 30)}</div>
        </div>
      </Card>
    </div>
  );
}
