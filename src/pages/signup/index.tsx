// Chakra ui components
import { useState, FormEvent } from "react";

// Chakra ui components
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  chakra,
  Text,
  Link,
  useToast,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  HStack,
} from "@chakra-ui/react";
//
import { Navigate, NavLink } from "react-router-dom";
import { authenticate, isAuthenticate, signup } from "../../helper";

// Type Check
interface Values {
  name: string;
  email: string;
  password: string;
}
interface Animation {
  error: null | string | boolean;
  loading: boolean;
}

const Signup = () => {
  const toast = useToast();
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    password: "",
  });
  const [animation, setAnimation] = useState<Animation>({
    error: null,
    loading: false,
  });

  // Destructuring
  const { name, email, password } = values;
  const { loading } = animation;

  // Handle Input Change
  const handleChange = (name: string) => (e: FormEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: e.currentTarget.value });
  };

  // Create account
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (name.length === 0 || email.length === 0 || email.length === 0) {
      toast({
        title: "All fields are required.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      setAnimation({ error: false, loading: true });
      signup({ name, email, password }).then((response: any) => {
        setAnimation({ error: false, loading: false });
        if (response.error) {
          return toast({
            title: Array.isArray(response.error)
              ? response.error[0]
              : response.error || "Somethign went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          authenticate(response.data);
        }
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {isAuthenticate() && <Navigate to="/" />}
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create an account, Sign up</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <chakra.form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Enter your name</FormLabel>
                <Input
                  type="text"
                  autoFocus
                  value={name}
                  onChange={handleChange("name")}
                  isDisabled={loading}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleChange("email")}
                  isDisabled={loading}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={handleChange("password")}
                  isDisabled={loading}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={loading}
                  isDisabled={loading}
                  loadingText="Account Creating..."
                  type="submit"
                >
                  Sign up
                </Button>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Box />
                  <HStack>
                    <Text>Don't have any account?</Text>
                    <Link as={NavLink} to="/e/signin" color={"blue.400"}>
                      {" "}
                      Signin
                    </Link>
                  </HStack>
                </Stack>
              </Stack>
            </Stack>
          </chakra.form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
