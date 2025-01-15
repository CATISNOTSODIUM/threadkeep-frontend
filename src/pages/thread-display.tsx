import React, { Suspense } from "react";
import NavBar from "../components/common/nav-bar.tsx";
import SideBar from "../components/common/side-bar.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteThread,
  getComments,
  getThread,
  isLike,
  reactionThread,
  ReactionType,
} from "../api/threads.ts";
import { Thread, User, Comment } from "../models/index.ts";
import { convertTimeToMessageHistory } from "../utils/message-history.ts";
import MDEditor from "@uiw/react-md-editor";
import CommentCard from "../components/comment/comment-card.tsx";
import CommentsCreateCard from "../components/comment/comment-create-card.tsx";
import ThreadEditModal from "../components/thread/thread-edit.tsx";
import { isVerified } from "../utils/isVerified.ts";
import { getUser } from "../utils/jwt.ts";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import Heart from "../assets/heart.tsx";

export default function ThreadDisplay() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [thread, setThread] = React.useState<Thread>();
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [currentLike, setCurrentLike] = React.useState(0);
  const [isToggleLike, setIsToggleLike] = React.useState(false);
  const [isEditThread, setIsEditThread] = React.useState(false);
  const currentUser: User = getUser();
  const navigate = useNavigate();
  const fetchThread = async () => {
    const threadID = searchParams.get("id");

    if (threadID) {
      const threadRequest = await getThread(threadID);
      const { likes } = threadRequest.data;
      setCurrentLike(likes);
      setThread(threadRequest.data);
      const likeStatusRequest = await isLike(currentUser, threadID);
      if (!likeStatusRequest.error) {
        setIsToggleLike(likeStatusRequest.data);
      }
    }
  };
  const fetchComments = async () => {
    const threadID = searchParams.get("id");
    if (threadID) {
      const commentsRequest = await getComments(threadID);
      setComments(commentsRequest.data);
    }
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchThread();
    fetchComments();
    const threadID = searchParams.get("id");
    if (threadID) reactionThread(currentUser, threadID, ReactionType.VIEW);
  }, [isEditThread]);

  const { title, content, id, user, tags, createdAt } = thread ?? {};
  const time = convertTimeToMessageHistory(createdAt);
  const isEditable = user?.name === currentUser.name;
  const handleDeleteThread = async () => {
    const threadID = searchParams.get("id");
    if (threadID) {
      const threadRequest = await deleteThread(threadID, currentUser);
      if (threadRequest.error) {
        return;
      }
    }
    navigate("/threads");
  };
  const handleLike = async () => {
    const threadID = searchParams.get("id");
    if (threadID)
      await reactionThread(
        currentUser,
        threadID,
        !isToggleLike ? ReactionType.LIKE : ReactionType.UNLIKE
      );
    setCurrentLike(currentLike + (isToggleLike ? -1 : 1));
    setIsToggleLike(!isToggleLike);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-row min-h-screen  mx-12 lg:mx-12 my-24 gap-10">
        <SideBar />
        {thread && (
          <div className="flex flex-col lg:w-2/3 w-full lg:mx-48">
            <div className="flex flex-row content-center">
              <Card className="flex flex-col w-full">
                <CardBody>
                  <div className="text-base my-1">
                    {isEditable ? user?.name + " (You)" : user?.name}
                    {"  : "}
                    <span className="font-bold">{time}</span>
                  </div>

                  <div className="text-3xl mb-4 font-bold">{title}</div>
                  <div className="flex flex-row text-base gap-2">
                    <ThreadEditModal threadProps={thread} />
                    <Badge
                      colorScheme="red"
                      variant={"outline"}
                      className="cursor-pointer"
                      onClick={handleDeleteThread}
                    >
                      <Tooltip label="Delete this thread">🗑 Delete</Tooltip>
                    </Badge>
                    {tags?.map((tag) => (
                      <Badge colorScheme="teal">{tag.name}</Badge>
                    ))}
                  </div>
                  <div data-color-mode="light">
                    <MDEditor.Markdown
                      className="w-full my-5 h-fit"
                      source={content}
                      style={{ fontFamily: '"inter", sans-serif' }}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>
            <Card className="p-5 mt-5">
              <HStack>
                <Button
                  colorScheme={isToggleLike ? "red" : "blackAlpha"}
                  className="my-2 hover:animate-pulse w-fit"
                  onClick={handleLike}
                  variant={"outline"}
                >
                  {isToggleLike ? "Liked" : "Like"}{" "}
                  <Heart className={"w-4 h-4 "} />
                </Button>

              </HStack>
               <CommentsCreateCard
                  threadID={id ?? ""}
                  fetchComments={fetchComments}
                />
              {comments.length > 0 ? (
                comments?.map((comment) => <CommentCard {...comment} />)
              ) : (
                <div className="text-gray-500 text-sm py-3">No comments</div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
