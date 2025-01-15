import * as React from "react";
import { Thread, User } from "../../models/index.ts";
import { convertTimeToMessageHistory } from "../../utils/message-history.ts";
import { extractFirstImageUrl, truncateBody } from "../../utils/truncate-body.ts";
import { createSearchParams, useNavigate } from "react-router-dom";
import { reactionThread } from "../../api/threads.ts";
import { getUser } from "../../utils/jwt.ts";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Heart from "../../assets/heart.tsx";
import View from "../../assets/view.tsx";

export default function ThreadCard(props: Thread) {
  const navigate = useNavigate();
  const { title, content, id, user, likes, views, createdAt, tags, isSaved } = props;
  const truncatedContent = truncateBody(content, 200);
  const extractedFirstImageUrl = extractFirstImageUrl(content);
  const time = convertTimeToMessageHistory(createdAt);
  const currentUser: User = getUser();
  const [isSavedCurrent, setIsSavedCurrent] = React.useState(isSaved);
  const onClick = () => {
    navigate({
      pathname: "/thread-display",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };
  const saveThread = async () => {
    await reactionThread(currentUser, id, isSavedCurrent ? 4 : 3);
    setIsSavedCurrent(!isSavedCurrent);
  };
  const isEditable = user.name === currentUser.name;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant="outline"
    >
      <HStack>
        <VStack className={`relative h-full min-w-36 bg-inherit z-0 text-black justify-center overflow-hidden`}>
          <Image 
            src={extractedFirstImageUrl}
            fit="cover"
            className="absolute -z-10 opacity-30 h-full"
          />
          <HStack>
            <Heart />
            <span>{likes}</span>
            <View />
            <span>{views}</span>
          </HStack>
          <Button 
            colorScheme={(isSavedCurrent ? "yellow" : "blackAlpha")}
            size="sm"
            className={(
              isSavedCurrent
                ? "bg-yellow-50 hover:bg-yellow-100"
                : "bg-white hover:bg-gray-100"
            )}
            onClick={saveThread}
          >
            {isSavedCurrent ? 'Saved' : 'Save'}
          </Button>
        </VStack>
        <CardBody
          className={`cursor-pointer hover:bg-yellow-50 ${isSavedCurrent ? 'bg-yellow-50' : ''}`}
          onClick={onClick}
        >
        <Text className="font-bold text-xl">{title}</Text>
        <div className="text-xs my-1">
          {isEditable ? user.name + " (You)" : user.name}
          {"  : "}
          <span className="font-bold">{time}</span>
        </div>
        <Stack direction="row">
          {isEditable && <Badge className="text-xs" colorScheme="red">Editable ✎</Badge>}
          {tags.map((tag) => (
            <Badge colorScheme="teal">{tag.name}</Badge>
          ))}
        </Stack>
        <Text py="2">{truncatedContent}</Text>
      </CardBody>
      </HStack>
      

      
    </Card>
  );
}

/*
<div
      className={
        "focus:cursor-pointer flex flex-col w-full text-left border-2 border-gray-50 p-5 " +
        (isSavedCurrent
          ? "bg-yellow-50 hover:bg-yellow-100"
          : "bg-white hover:bg-gray-100")
      }
    >
      <button
        className={
          "text-xs bg-gray-200 w-fit px-2 my-1 rounded-xl duration-500 " +
          (isSavedCurrent
            ? "opacity-100 bg-yellow-200 hover:opacity-20"
            : "opacity-20 hover:opacity-100")
        }
        onClick={async () => {
          await reactionThread(currentUser, id, isSavedCurrent ? 4 : 3);
          setIsSavedCurrent(!isSavedCurrent);
        }}
      >
        {isSavedCurrent ? "SAVED" : "SAVE"}
      </button>

      <button
        className="text-left"
        onClick={() => {
          navigate({
            pathname: "/thread-display",
            search: createSearchParams({
              id: id,
            }).toString(),
          });
        }}
      >
        <div className="text-xl font-bold text-gray-950">{title}</div>
        <div className="text-xs">
          {user.name}
          {"  : "}
          <span className="font-bold">{time}</span>
          {user.name === currentUser.name && (
            <button className="text-red-600 ml-3">✎ Edit </button>
          )}
        </div>

        <div className="text-xs text-gray-500 py-2">
          <div className="pr-24 whitespace-pre-wrap">
            {truncateBody(content, 200)}
          </div>
        </div>
      </button>
      <div className="flex flex-row text-xs gap-2">
        {tags.map((tag) => {
          return (
            <div
              key={tag.id}
              className="w-fit px-2 rounded-full  bg-gray-200 text-gray-800"
            >
              {tag.name}
            </div>
          );
        })}
      </div>
      <div className="text-sm py-2">
        {" ⬢ " + likes}
        {" 👁️‍🗨️ " + views}
      </div>
    </div>
  */
