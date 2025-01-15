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
      selectedTags.map((tag) => tagsDict[tag].id)
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
          <InputGroup className="py-2 max-w-96">
            <InputLeftAddon>Title</InputLeftAddon>
            <Input
              placeholder="Your title (Max character 100)"
              value={threadTitle}
              onChange={(e) => setThreadTitle(e.target.value)}
            />
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
