import * as React from "react";
import MarkdownHandler from "../common/markdown-editor.tsx";
import { User } from "../../models/index.ts";
import { createNewComment } from "../../api/threads.ts";
import { getUser } from "../../utils/jwt.ts";
import { Button } from "@chakra-ui/react";

export default function CommentsCreateCard(props: {
  threadID: string;
  fetchComments: () => Promise<void>;
}) {
  const { threadID, fetchComments } = props;
  const user: User = getUser();

  const [isToggle, setIsToggle] = React.useState(false);
  const [commentsContent, setCommentsContent] = React.useState("");
  const [message, setMessage] = React.useState("");
  const onSubmit = async () => {
    const commentRequest = await createNewComment(
      user,
      threadID,
      commentsContent
    );
    if (commentRequest.error) {
      setMessage(commentRequest.error);
      return;
    }
    await fetchComments();
    setIsToggle(false);
  };
  return (
    <div className="flex flex-col w-full text-left gap-2 duration-200">
      <Button
        colorScheme="yellow"
        className="w-24"
        onClick={() => setIsToggle(!isToggle)}
      >
        Reply ✉️
      </Button>
      {isToggle && (
        <>
          <div className="text-sm text-red-600">{message}</div>
          <MarkdownHandler
            content={commentsContent}
            setContent={setCommentsContent}
          />
          <div className="text-xs text-gray-400">
            At this stage, only image URLs are allowed.
          </div>
          <Button
            colorScheme="blue"
            variant={"outline"}
            className="w-fit"
            onClick={onSubmit}
          >
            SUBMIT
          </Button>
        </>
      )}
    </div>
  );
}
