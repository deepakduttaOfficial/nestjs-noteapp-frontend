import { useState } from "react";

// Chakra ui components
import {
  Badge,
  Card,
  CardHeader,
  Heading,
  HStack,
  IconButton,
  LinkBox,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";

// React Icons
import { BsClockHistory } from "react-icons/bs";
import { HiCalendarDays } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

// Icons
import { AiFillDelete } from "react-icons/ai";
import { isAuthenticate } from "../../helper";
import { removeNote } from "../../helper/notehelper";

const NoteCard = ({ note, index, setRefresh }: any) => {
  const auth = isAuthenticate();
  const [loading, setLoading] = useState<boolean>(false);

  const date: Date = new Date(Date.now());
  const removeNoteHandler = (id: string) => {
    setLoading(true);
    removeNote({ token: auth.access_token, id: id }).then((response) => {
      setLoading(false);
      if (!response.error) {
        setRefresh((pre: boolean) => !pre);
      }
    });
  };
  return (
    <Card
      bg={"transparent"}
      my="5"
      cursor="pointer"
      border="2"
      borderColor={"purple.500"}
      shadow="lg"
      backdropFilter="auto"
      backdropContrast="85%"
      as={LinkBox}
    >
      <CardHeader>
        <HStack alignItems="start" scaleX={"3"}>
          <HStack flex={"1"} as={NavLink} to={`/note/${note.id}`}>
            <Badge colorScheme="purple" mt="1" mr="4">
              {index}
            </Badge>

            <VStack alignItems="flex-start">
              <HStack  color={useColorModeValue("gray.700", "white")}>
                <Heading
                  size="md"
                  variant={"h1"}
                  fontWeight="medium"
                  isTruncated
                >
                  {note?.title}
                </Heading>
              </HStack>
              <HStack>
                <Badge
                  colorScheme="purple"
                  display="flex"
                  alignItems="center"
                  gap="1"
                >
                  {<BsClockHistory />} {date.toLocaleTimeString()}
                </Badge>
                <Badge
                  colorScheme="purple"
                  display="flex"
                  alignItems="center"
                  gap="1"
                >
                  {<HiCalendarDays />} Monday
                </Badge>
              </HStack>
            </VStack>
          </HStack>

          <IconButton
            aria-label="Delete"
            icon={<AiFillDelete />}
            isLoading={loading}
            onClick={() => {
              removeNoteHandler(note.id);
            }}
          />
        </HStack>
      </CardHeader>
    </Card>
  );
};

export default NoteCard;
