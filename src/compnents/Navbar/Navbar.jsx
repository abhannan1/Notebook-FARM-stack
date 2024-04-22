import { Box, Button, Flex, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";

export const Navbar = () => {
  const { logout, user } = useAuth();
  return (
    <>
      <Box 
      minHeight="100vh"
      >
        <Flex
        as='nav'
        align='center'
        justify='space-between'
        wrap='wrap'
        padding='1rem'
        bg={useColorModeValue('green.300', 'green.600')}
        >
            <Text as='h2' fontSize={24} fontWeight='bold'>
                TODOIST
            </Text>
            <Text as='h2' fontSize={24} fontWeight='bold'>
              Welcome, {(user?.username || "hey").toUpperCase()}
            </Text>
          <Stack
          direction='row'
          align='center'
          spacing={4}
          >
            <ThemeToggler size='md'/>
            <Button onClick={logout} colorScheme="green">Logout</Button>
          </Stack>
        </Flex>
        <Outlet />
      </Box>
    </>
  );
};
