import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Text, Flex } from "@chakra-ui/core";
import SingleTodo from "./SingleTodo";
import { get_todos_query } from "../graphql/queries";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoList() {
  const { loading, error, data } = useQuery(get_todos_query);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :( {error}</Text>;

  return (
    <Box w="100%">
      {data.todos.length < 1 ? (
        <Text>No todo items to display</Text>
      ) : (
        data.todos.map((todo: Todo) => <SingleTodo todo={todo} key={todo.id} />)
      )}
    </Box>
  );
}
