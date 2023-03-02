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
    setAnimation({ error: false, loading: true });
    signup({ name, email, password }).then((response: any) => {
      authenticate(response);
      setAnimation({ error: false, loading: false });
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
              <FormLabel color="gray.400">Name</FormLabel>
              <Input
                placeholder="Name"
                type="text"
                autoFocus
                value={name}
                onChange={handleChange("name")}
                isDisabled={loading}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Email</FormLabel>
              <Input
                placeholder="Enter you email"
                type="email"
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
              isLoading={loading}
              isDisabled={loading}
              loadingText="Account Creating..."
            >
              Sign up
            </Button>
          </chakra.form>
          <Text align={"center"}>
            Already a user?{" "}
            <Link as={NavLink} to="/e/signin" color={"blue.400"}>
              Signin
            </Link>
          </Text>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Signup;
