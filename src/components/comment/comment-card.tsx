import * as React from "react";
import { Comment, User } from "../../models/index.ts";
import { convertTimeToMessageHistory } from "../../utils/message-history.ts";
import MDEditor from "@uiw/react-md-editor";
import CommentEditModal from "./comment-edit.tsx";
import { deleteComment } from "../../api/threads.ts";
import { getUser } from "../../utils/jwt.ts";
import { Card, Tooltip, Badge } from "@chakra-ui/react";

export default function CommentCard(props: Comment) {
  const { content, id, user, createdAt } = props;
  const time = convertTimeToMessageHistory(createdAt);
  const currentUser: User = getUser();
  const handleCommentDelete = async () => {
    const commentRequest = await deleteComment(id, currentUser);
    if (commentRequest.error) {
      return;
    }
    window.location.reload();
  };
  return (
    <Card className="flex flex-col text-left bg-gray-50 hover:bg-gray-100 rounded-xl  my-3 py-5 px-6">
      <div className="text-xs">
        {user.name}
        {"  : "}
        <span className="font-bold">{time}</span>
        {user.name === currentUser.name && (
          <div className="flex gap-2">
            <CommentEditModal commentProps={props} />
            <Badge
              colorScheme="red"
              variant={"outline"}
              className="cursor-pointer"
              onClick={handleCommentDelete}
            >
              <Tooltip label="Delete this comment">🗑 Delete</Tooltip>
            </Badge>
          </div>
        )}
      </div>
      <div className="text-sm py-3" data-color-mode="light">
        <MDEditor.Markdown
          className="w-full my-1 h-fit"
          source={content}
          style={{
            fontFamily: '"inter", sans-serif',
            backgroundColor: "inherit",
          }}
        />
      </div>
    </Card>
  );
}
