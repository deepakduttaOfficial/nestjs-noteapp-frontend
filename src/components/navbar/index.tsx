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
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { BsSun, BsMoon } from "react-icons/bs";

//
import { NavLink } from "react-router-dom";

import { navContainerStyle, signButtonStyle, signInButtonStyle } from "./style";
import { isAuthenticate, logout } from "../../helper";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  return (
    <Box>
      <Flex
        {...navContainerStyle}
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
            <IconButton
              aria-label="toggle color mood"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <BsMoon /> : <BsSun />}
            />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
