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
  Tooltip,
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
      <HStack className="w-full">
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
            onClick={saveThread}
          >
            <Tooltip label={!isSavedCurrent ? 'SAVE?' : 'UNSAVE?'} placement="right-end">
                {isSavedCurrent ? 'Saved' : 'Save'}
            </Tooltip>
            
          </Button>
        </VStack>
        <CardBody
          className={`w-full cursor-pointer hover:bg-gray-50 ${isSavedCurrent ? 'bg-yellow-50' : ''}`}
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
