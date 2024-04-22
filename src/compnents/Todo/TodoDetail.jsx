import {
  Button,
  Center,
  Container,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { useAxios } from "../../hooks/useAxios";
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";

export const TodoDetail = ({}) => {
  const { todo_id } = useParams();
  const toast = useToast();
  const todoUrl = `/todo/${todo_id}`;
  const { isLoading, isError, data, fetchData:fetchTodo } = useAxios(todoUrl, todo_id);
  const navigate = useNavigate();
  const title = data?.title ?? "No title";
  const description = data?.description ?? "No Description";
  const status = data?.status 
  const background = useColorModeValue("gray.300", "gray.600");

  useEffect(()=>{
    console.log(todo_id)
  })

  const deleteTodo = useCallback(
    () => {
      axiosInstance
        .delete(`/todo/${todo_id}`)
        .then(() => {
          toast({
            title: `deleted Successfully`,
            status: "success",
            isClosable: true,
            duration: 1500,
          });
          navigate("/");
        })
        .catch(() => {
          toast({
            title: `Could not delete`,
            status: "error",
            isClosable: true,
            duration: 1500,
          });
        });
    },
    [todo_id]
  );



  // useEffect(() => {
  //   if( isError){
      
  //     toast({
  //       title: "No such Todo Found",
  //       status: "error",
  //       isClosable: true,
  //       duration: 1500,
  //     });
  //     // navigate('/'); // Return early if navigation happens
  //   }
  // }, [isError]);

  if (isLoading) {
    return (
      <>
        <Container mt={6}>
          <Center mt={6}>
            <Spinner
              speed="0.65s"
              size="xl"
              emptyColor="green.200"
              color="green.500"
              thickness="4px"
            />
          </Center>
        </Container>
      </>
    );
  }

  return (
    <>
      {isError ? (
        <Navigate to="/" />
      ) : (
        <>
          <Container mt={6} p={0} display="flex" justifyContent="flex-end">
            <Button
              colorScheme="gray"
              onClick={() => navigate("/", { replace: true })}
            >
              Back
            </Button>
          </Container>
          <Container
            my={6}
            p={5}
            minHeight="7rem"
            bg={background}
            rounded="lg"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize={22}>{title}</Text>
            <Text bg="gray.500" mt={2} p={2} rounded="lg">
              {description}
            </Text>
            <Button
              onClick={deleteTodo}
              colorScheme="yellow"
              size="sm"
              p={3}
              mt={6}
              _hover={{
                opacity: 0.9,
                cursor: "pointer",
                transform: "translateY(-2px)",
              }}
            >
              Delete Todo
            </Button>
          </Container>
          <Container>
            <AddUpdateTodoModal
              my={3}
              editable={true}
              defaultValues={{
                title: title,
                description: description,
                status: status,
              }}
              onSuccess={fetchTodo}
              url={todoUrl}
            />
          </Container>
        </>
      )}
    </>
  );
};
