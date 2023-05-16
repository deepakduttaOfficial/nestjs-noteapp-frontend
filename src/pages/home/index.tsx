import { useState, useEffect, FormEvent } from "react";

// Chakra ui components
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Skeleton,
  Textarea,
  useToast,
} from "@chakra-ui/react";

// Custom components
import Navbar from "../../components/navbar";
import NoteCard from "../../components/notecard";
import { createPost, getAllPost } from "../../helper/notehelper";
import { isAuthenticate } from "../../helper";
// Interfaces
interface CreatePost {
  title: string;
  description: string;
}

const Home = () => {
  const toast = useToast();
  const [values, setValues] = useState<CreatePost>({
    title: "",
    description: "",
  });
  // Destrucring
  const { title, description } = values;
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteLoading, setNoteLoading] = useState(false);

  const auth = isAuthenticate();

  // Handle Input Change
  const handleChange =
    (name: string) =>
    (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues({ ...values, [name]: e.currentTarget.value });
    };

  // Create a note
  const handleClick = () => {
    setLoading(true);
    createPost({ title, description, token: auth.access_token }).then(
      (response) => {
        setLoading(false);
        setValues({ title: "", description: "" });
        if (response.error) {
          const error = response.error;
          return toast({
            title: Array.isArray(error) ? error[0] : error,
            position: "top-right",
            status: "error",
            duration: 90000,
            isClosable: true,
          });
        } else {
          setRefresh((pre) => !pre);
          return toast({
            title: "Note created",
            position: "top-right",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    );
  };

  // Get all note
  useEffect(() => {
    setNoteLoading(true);
    getAllPost(auth.access_token).then((response) => {
      setNoteLoading(false);
      if (response.data) {
        setNotes(response.data);
      }
    });
  }, [refresh]);

  return (
    <>
      <Navbar />
      <Container my={5}>
        <Card bg="transparent" shadow={"dark-lg"}>
          <CardBody>
            <FormControl mb="5">
              <FormLabel color="gray.400">Title</FormLabel>
              <Input
                placeholder="Title"
                size="lg"
                type="text"
                autoFocus
                value={title}
                onChange={handleChange("title")}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Description</FormLabel>
              <Textarea
                placeholder="Continue with you note..."
                value={description}
                onChange={handleChange("description")}
              />
            </FormControl>
            <Button
              mt="5"
              bg= "blue.400"
              color= "white"
              _hover= {{
                bg: "blue.500",
              }}
              w="full"
              onClick={handleClick}
              isLoading={loading}
              isDisabled={loading}
              loadingText="creating"
            >
              Create note
            </Button>
          </CardBody>
        </Card>
      </Container>
      <Divider bg="gray.500" h="0.8px" />
      <Box px={{ base: 4, md: 10 }}>
        {noteLoading &&
          Array(5)
            .fill(" ")
            .map((_, index) => (
              <Box my={3} key={index}>
                <Skeleton height="80px" />
              </Box>
            ))}

        {notes.map((note, index) => (
          <NoteCard
            key={index}
            note={note}
            index={index + 1}
            setRefresh={setRefresh}
          />
        ))}
      </Box>
    </>
  );
};

export default Home;
