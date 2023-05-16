// Chakra ui components
import { useState, FormEvent } from "react";

// Chakra ui components
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  chakra,
  Link,
  useToast,
  Stack,
  Flex,
  useColorModeValue,
  Heading,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";

//
import { Navigate, NavLink } from "react-router-dom";
import { authenticate, isAuthenticate, signin } from "../../helper";

// Type Check
interface Values {
  email: string;
  password: string;
}
interface Animation {
  error: null | string | boolean;
  loading: boolean;
}

const Signin = () => {
  const toast = useToast();
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
  });
  const [animation, setAnimation] = useState<Animation>({
    error: null,
    loading: false,
  });

  // Destructuring
  const { email, password } = values;
  const { error, loading } = animation;

  // Handle Input Change
  const handleChange = (name: string) => (e: FormEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: e.currentTarget.value });
  };

  // Create account
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnimation({ error: true, loading: true });
    signin({ email, password }).then((response) => {
      setAnimation({ ...animation, loading: false });
      if (response.error) {
        const error = response.error;
        toast({
          title: Array.isArray(error) ? error[0] : error,
          position: "top-right",
          status: "error",
          duration: 90000,
          isClosable: true,
        });
      }
      if (response.data) {
        authenticate(response.data);
      }
    });
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <chakra.form
              display="flex"
              flexDirection="column"
              gap={5}
              onSubmit={handleSubmit}
            >
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  autoFocus
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
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isDisabled={loading}
                isLoading={loading}
                type="submit"
                loadingText="Sign in..."
              >
                Sign in
              </Button>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Box />
                  <HStack>
                    <Text>Don't have any account?</Text>
                    <Link as={NavLink} to="/e/signup" color={"blue.400"}>
                      {" "}
                      Signup
                    </Link>
                  </HStack>
                </Stack>
              </Stack>
            </chakra.form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signin;
