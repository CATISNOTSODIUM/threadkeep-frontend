import * as React from "react";
import MarkdownHandler from "../common/markdown-editor.tsx";
import { Tag, User } from "../../models/index.ts";
import { createNewThread } from "../../api/threads.ts";
import MultipleSelectChip from "../common/multiple-select.tsx";
import { tagList } from "../../api/tags.ts";
import { getUser } from "../../utils/jwt.ts";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalContent,
  ModalOverlay,
  StepTitle,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

interface TagDictType {
  label: string;
  value: string;
}

export default function ThreadCreateCard() {
  const user: User = getUser();
  const [tagsDict, setTagsDict] = React.useState<TagDictType[]>([]);
  const [threadTitle, setThreadTitle] = React.useState("");
  const [threadContent, setThreadContent] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // message status
  const [message, setMessage] = React.useState(
    "At this stage, only image URLs are allowed."
  );
  const fetchTags = async () => {
    const tagsRequest = await tagList(); // res is an array
    if (tagsRequest.error) {
      setMessage(tagsRequest.error);
      return;
    }
    try {
      const tmp: TagDictType[] = [];

      tagsRequest.data.forEach((tag) => {
        tmp.push({
          label: tag.name,
          value: tag.name,
        });
        tmp[tag.name] = tag;
      });
      setTagsDict(tmp);
    } catch (e) {
      setMessage(e);
      return;
    }
  };
  const onSubmit = async () => {
    if (threadTitle.length > 100) {
      setMessage("Title should not exceed 100 characters.");
      return;
    }
    if (threadTitle === "" || threadContent === "") {
      setMessage("Title and content must not be empty.");
      return;
    }

    const threadRequest = await createNewThread(
      user,
      threadTitle,
      threadContent,
      selectedTags.map((tag) => ({
        "id": tagsDict[tag].id,
        "name": tagsDict[tag].name
      }))
    );
    if (threadRequest.error) {
      setMessage(threadRequest.error);
    } else {
      window.location.reload();
    }
  };

  React.useEffect(() => {
    fetchTags();
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen} colorScheme="teal">
        <Tooltip label="Create new thread" placement="right-end">
          Create 🛠️
        </Tooltip>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent className="p-10">
          <div className="font-bold text-xl">Create new thread</div>
          <div className="text-xs text-red-400">{message}</div>
          <InputGroup className="py-2">
            <InputLeftAddon>Title</InputLeftAddon>
            <Input
              placeholder="Your title (Max character 100)"
              value={threadTitle}
              onChange={(e) => setThreadTitle(e.target.value)}
            />
            <UserGuideModal/>
          </InputGroup>

          <div className="flex flex-row"></div>

          <div data-color-mode="light">
            <MarkdownHandler
              content={threadContent}
              setContent={setThreadContent}
            />
          </div>
          <div className="my-5">
            <MultipleSelectChip
              tagOptions={tagsDict}
              setSelectedTags={setSelectedTags}
            />
          </div>
          <HStack>
            <Button colorScheme="yellow" className="w-fit" onClick={onSubmit}>
              Start your discussion 🐝
            </Button>
            <Button
              colorScheme="red"
              variant={"outline"}
              className="w-fit"
              onClick={onClose}
            >
              Cancel
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </div>
  );
}



export function UserGuideModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Button onClick={onOpen} colorScheme="teal" variant={"outline"} size="xl" className="px-2 ml-1">
      <Tooltip label='Open user guide' placement="right-end">
          Guide 📙
      </Tooltip>
    </Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent className="p-10">
        <div className="text-2xl font-bold">User guide: Create New Thread</div>
        <p className="py-2">
          <div className="text-red-600 font-bold">
            It is mandatory to fill in both title and description in order to proceed.
          </div>
          <div><b>Title:</b> A concise and informative name for your thread</div>
          <div><b>Description:</b>  A more detailed explanation of the topic or discussion you're starting. This provides context for other users. While the description text field is supported by markdown, LaTex has not yet been supported.</div>
          <div><b>Optional Tags:</b> You can also add tags to your thread to categorize it and make it easier for others to find. Tags are optional, but they can be very helpful in organizing and discovering relevant discussions.</div>
        </p>
        
    

        <Button onClick={onClose} variant={"outline"} colorScheme="red" className="w-fit">
          Close
        </Button>
        
      </ModalContent>
    </Modal>
    </>
  )
}
