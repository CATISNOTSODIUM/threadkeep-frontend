// comment edit modal
import * as React from "react";
import MDEditor from "@uiw/react-md-editor";
import { filterContent } from "../../utils/save-markdown.ts";
import { Button, Modal, ModalContent, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";


export default function PreviewModal(props: {
  markdownContent: string;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
  filterStatus: any;
}) {
  const { markdownContent, setIsToggle, filterStatus } = props;
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Button onClick={onOpen} colorScheme="yellow" variant={"outline"} size="sm">
      <Tooltip label='Preview' placement="right-end">
          Preview
      </Tooltip>
    </Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent className="p-10">
        <Button onClick={onClose} variant={"outline"} colorScheme="red" className="w-fit">
          Close
        </Button>
        <div data-color-mode="light">
          <MDEditor.Markdown
        className="w-full my-1 h-3/4 overflow-scroll py-2"
        source={filterContent(markdownContent, filterStatus)}
        style={{
          fontFamily: '"inter", sans-serif',
          backgroundColor: "inherit",
        }}
      />
        </div>
      </ModalContent>
    </Modal>
    </>
  )
}
