// comment edit modal
import * as React from "react";
import { Comment, User } from "../../models/index.ts";
import MarkdownHandler from "../common/markdown-editor.tsx";
import { updateComment } from "../../api/threads.ts";
import { getUser } from "../../utils/jwt.ts";
import { Badge, Button, HStack, Modal, ModalContent, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";



export default function CommentEditModal(props: { commentProps: Comment; }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { commentProps } = props;
  const { content, id, user, likes, views, createdAt } = commentProps;
  const [commentsContent, setCommentsContent] = React.useState(content);
  const currentUser: User = getUser();
  const submitComment = async () => {
    await updateComment(id, currentUser, commentsContent);
    onClose();
    window.location.reload();
  };


  return (
    <div>
      <Badge
        colorScheme="yellow"
        variant={"outline"}
        className="cursor-pointer"
        onClick={onOpen}
      >
        <Tooltip label="Edit this comment">✎ Edit </Tooltip>
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
          <div className="text-xl font-bold">Comment editor</div>
          <MarkdownHandler
          content={commentsContent}
          setContent={setCommentsContent}
        />
          <HStack className="mt-3">
            <Button
              colorScheme="yellow"
              className="w-fit"
              onClick={submitComment}
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
