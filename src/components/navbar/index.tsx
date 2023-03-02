import React from "react";

// Chakra ui components
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";

//
import { NavLink } from "react-router-dom";

import { navContainerStyle, signButtonStyle, signInButtonStyle } from "./style";
import { isAuthenticate, logout } from "../../helper";

const Navbar = () => {
  const toast = useToast();
  return (
    <Box>
      <Flex
        {...navContainerStyle}
        // bgGradient="linear(151deg, rgb(27 32 68), rgb(58, 32, 105), rgb(38 45 78))"
      >
        <Flex flex={{ base: 1 }} ml={{ base: -2 }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            // color={"white"}
            fontWeight="medium"
          >
            Note Book
          </Text>
        </Flex>
        <Flex justify={{ base: "center", md: "start" }}>
          <Stack direction="row">
            {isAuthenticate() ? (
              <Button
                as={NavLink}
                to="/e/signin"
                {...signButtonStyle}
                onClick={() => {
                  logout(() => {
                    toast({
                      title: "Logout",
                      position: "top-right",
                      status: "warning",
                      duration: 9000,
                      isClosable: true,
                    });
                  });
                }}
              >
                Log out
              </Button>
            ) : (
              <>
                <Button as={NavLink} to="/e/signin" {...signInButtonStyle}>
                  Sign In
                </Button>
                <Button {...signButtonStyle} as={NavLink} to={"/e/signup"}>
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
