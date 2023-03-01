import { useEffect, useState, FormEvent } from "react";
// Chakra ui componets
import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
// React router dom
import { NavLink, useParams } from "react-router-dom";
import { getSinglePost, updateNote } from "../../helper/notehelper";
import { isAuthenticate } from "../../helper";

// Icons
import { BiArrowBack } from "react-icons/bi";

// Interfaces
interface CreatePost {
  title: string;
  description: string;
}

const Note = () => {
  const toast = useToast();
  const { noteId } = useParams<any>();
  const auth = isAuthenticate();
  const [values, setValues] = useState<CreatePost>({
    title: "",
    description: "",
  });
  // Destrucring
  const { title, description } = values;
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange =
    (name: string) =>
    (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues({ ...values, [name]: e.currentTarget.value });
    };

  useEffect(() => {
    getSinglePost(auth.access_token, noteId).then((response) => {
      if (!response.error) {
        setValues({
          title: response.data.title,
          description: response.data.description,
        });
      }
    });
  }, []);

  // Update Note
  const handleClick = () => {
    setLoading(true);
    updateNote({
      title,
      description,
      token: auth.access_token,
      id: noteId,
    }).then((response) => {
      setLoading(false);
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
        return toast({
          title: "Note Updated",
          position: "top-right",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Container my={10}>
      <IconButton
        aria-label="back"
        icon={<BiArrowBack />}
        as={NavLink}
        to="/"
      />
      <Card bg="transparent" shadow={"dark-lg"} mt="5">
        <CardBody>
          <FormControl mb="5">
            <FormLabel color="gray.400">Title</FormLabel>
            <Input
              placeholder="Title"
              size="lg"
              type="text"
              focusBorderColor="purple.700"
              color={"white"}
              autoFocus
              value={title}
              onChange={handleChange("title")}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.400">Description</FormLabel>
            <Textarea
              placeholder="Continue with you note..."
              focusBorderColor="purple.700"
              color={"white"}
              value={description}
              onChange={handleChange("description")}
            />
          </FormControl>
          <Button
            mt="5"
            bgGradient="linear(151deg, rgb(60 48 84), rgb(83 47 147), rgb(69 26 149))"
            _hover={{
              bgGradient:
                "linear(151deg, rgb(60 48 84), rgb(83 47 147), rgb(69 26 149))",
            }}
            color="white"
            w="full"
            onClick={handleClick}
            isLoading={loading}
            isDisabled={loading}
            loadingText="updating..."
          >
            Update note
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Note;
