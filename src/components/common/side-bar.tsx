import * as React from "react";

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
import { ThreadSimplified } from "../../models/index.ts";
import { threadList } from "../../api/threads.ts";
import { truncateBody } from "../../utils/truncate-body.ts";
import {
  mergeContent,
  saveMarkdownAsMD,
  saveMarkdownAsRawText,
} from "../../utils/save-markdown.ts";
import PreviewModal from "./preview-modal.tsx";
import { createSearchParams, redirect, useNavigate } from "react-router-dom";
import { isVerified } from "../../utils/isVerified.ts";
import { getUser, removeUser } from "../../utils/jwt.ts";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Modal,
  Tooltip,
  useDisclosure,
  ModalContent,
  ModalOverlay,
  ModalBody
} from "@chakra-ui/react";

export default function SideBar() {
  const currentUser = getUser();
  const name = currentUser.name;
  const userID = currentUser.id;
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

  const logOut = () => {
    removeUser();
    redirect("/");
  };

  React.useEffect(() => {
    fetchThread();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(undefined);

  if (!isOpen) {
    return (
      <button
        className="fixed opacity-50 hover:opacity-100 top-0 left-0 z-50 w-10 h-full text-center content-center bg-gray-200 drop-shadow-2xl"
        onClick={onOpen}
        ref={btnRef}
      >
        <Tooltip label="Thread Manager 🔧" placement="right-end">
          {"⚙️ 🔧"}
        </Tooltip>
      </button>
    );
  }
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Dashboard 🔥
          <Card className="p-4">
            <div className={`font-bold text-xl my-1`}>
              {name?.toUpperCase()}
            </div>
            <HStack>
              <Button onClick={logOut} variant={"outline"} colorScheme="red">
                Log out{" "}
              </Button>
              <Button onClick={fetchThread} colorScheme="teal">
                {"  Refresh ↻  "}
              </Button>
            </HStack>
          </Card>
        </DrawerHeader>
        <DrawerBody>
          <Filter ThreadList={ThreadList} />
          <Card className="mt-1 p-3" variant={"elevated"}>
            <CardHeader className="font-bold text-xl">
              Saved threads 💾
            </CardHeader>
            <DashboardThread
              ThreadList={ThreadList}
              setThreadList={setThreadList}
              triggerRefresh={fetchThread}
            />
          </Card>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
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
  const [isPreviewToggle, setIsPreviewToggle] = React.useState(false);
  return (
    <div>
      <Button onClick={onOpen} colorScheme="blue">
        💾 Download
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
                setIsToggle={setIsPreviewToggle}
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
      <div className="bg-white hover:bg-black/50 hover:text-white rounded-md w-full px-3 py-1 flex flex-row justify-between hover:animate-pulse touch-pan-y">
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
      </div>
    </div>
  );
}
