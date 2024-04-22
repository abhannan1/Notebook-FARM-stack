import { Box, Center, Container, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import TodoCard  from "./TodoCard";
import { AddTodo } from "./AddTodo.";
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";

export const TodoList = () => {
  // const [todos, setTodos] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const isMounted = useRef(false)
  const todoUrl = "/todo"
  const { isLoading, isError, data:todos, fetchData:fetchTodos } = useAxios(todoUrl);


//   useEffect(() => {
//     if(isMounted.current) return;
//     fetchTodos();
//     isMounted.current = true
//   }, [todos]);


// const fetchTodos = () => {
//     setIsLoading(true);
//     axiosInstance
//       .get("/todo/")
//       .then((res) => {
//           setTodos(res.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

  return (
    <Container mt={9}  minWidth='70vw'>
        <AddUpdateTodoModal onSuccess={fetchTodos} url="/todo"/>
      {isLoading ? (
        <Center mt={6}>
            <Spinner
                thickness="4px"
                speed="0.65s"
                color="green.500"
                emptyColor="green.200"
                size='xl'
             />
        </Center>
      ) : (
        <>
        <Box mt={6} minWidth='65vw' >
          {todos?.map((todo, index) => {
            return <TodoCard key={todo.todo_id} todo={todo}/>;
          })}
        </Box>
        <AddTodo onSuccess={fetchTodos} url="/todo"/>
        </>
      )}

    </Container>
  );
};
