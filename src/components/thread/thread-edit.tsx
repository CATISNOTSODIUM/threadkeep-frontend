// comment edit modal
import * as React from "react";
import { Thread, User } from "../../models/index.ts";
import MarkdownHandler from "../common/markdown-editor.tsx";
import { updateThread } from "../../api/threads.ts";
import { getUser } from "../../utils/jwt.ts";
import {
  Badge,
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
} from "@chakra-ui/react";

export default function ThreadEditModal(props: { threadProps: Thread }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { threadProps } = props;
  const { content, title, id } = threadProps;
  const [threadContent, setThreadContent] = React.useState(content);
  const [threadTitle, setThreadTitle] = React.useState(title);
  const [message, setMessage] = React.useState("");
  const currentUser: User = getUser();

  const submitThread = async () => {
    setMessage("");
    const threadRequest = await updateThread(
      id,
      currentUser,
      threadTitle,
      threadContent
    );
    if (threadRequest.error) {
      setMessage(threadRequest.error);
      return;
    }
    onClose();
  };
  return (
    <div>
      <Badge
        colorScheme="yellow"
        variant={"outline"}
        className="cursor-pointer"
        onClick={onOpen}
      >
        <Tooltip label="Edit this thread">✎ Edit </Tooltip>
      </Badge>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent className="p-10">
          <div className="text-xl font-bold">Thread editor</div>
          <div className="text-sm text-red-600">{message}</div>

          <InputGroup className="py-2 max-w-96">
            <InputLeftAddon>Title</InputLeftAddon>
            <Input
              placeholder="Your title (Max character 100)"
              value={threadTitle}
              onChange={(e) => setThreadTitle(e.target.value)}
            />
          </InputGroup>
          <MarkdownHandler
            content={threadContent}
            setContent={setThreadContent}
          />
          <HStack className="mt-3">
            <Button
              colorScheme="yellow"
              className="w-fit"
              onClick={submitThread}
            >
              Update 🐝
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
