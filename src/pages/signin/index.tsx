// Chakra ui components
import { useState, FormEvent } from "react";

// Chakra ui components
import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Input,
  chakra,
  Text,
  Link,
  useToast,
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
    <Container bg="transparent" h="100vh">
      {isAuthenticate() && <Navigate to="/" />}
      <Card bg="transparent" shadow={"dark-lg"} my="16">
        <CardBody>
          <chakra.form
            display="flex"
            flexDirection="column"
            gap={5}
            onSubmit={handleSubmit}
          >
            <FormControl>
              <FormLabel color="gray.400">Email</FormLabel>
              <Input
                placeholder="Enter you email"
                type="email"
                focusBorderColor="purple.700"
                color={"white"}
                autoFocus
                value={email}
                onChange={handleChange("email")}
                isDisabled={loading}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Password</FormLabel>
              <Input
                placeholder="Enter a strong password"
                type="password"
                focusBorderColor="purple.700"
                color={"white"}
                value={password}
                onChange={handleChange("password")}
                isDisabled={loading}
              />
            </FormControl>
            <Button
              type="submit"
              my="5"
              bgGradient="linear(151deg, rgb(60 48 84), rgb(83 47 147), rgb(69 26 149))"
              _hover={{
                bgGradient:
                  "linear(151deg, rgb(60 48 84), rgb(83 47 147), rgb(69 26 149))",
              }}
              color="white"
              w="full"
              isDisabled={loading}
              isLoading={loading}
              loadingText="Sign in..."
            >
              Sign in
            </Button>
          </chakra.form>
          <Text align={"center"} color="white">
            Don't have an account?{" "}
            <Link as={NavLink} to="/e/signup" color={"blue.400"}>
              Signup
            </Link>
          </Text>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Signin;
