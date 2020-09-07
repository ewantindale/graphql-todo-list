import React from "react";
import { Text, Box } from "@chakra-ui/core";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <Box maxW="800px" mx="auto">
      <Text fontSize="6xl">graphql todo list</Text>
      <AddTodo />
      <TodoList />
    </Box>
  );
}

export default App;
