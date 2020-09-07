import { useMutation } from "@apollo/client";
import { Box, Button, Flex, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import {
  delete_todo_mutation,
  update_todo_mutation,
} from "../graphql/mutations";
import { get_todos_query } from "../graphql/queries";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function SingleTodo({ todo }: { todo: Todo }) {
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateTodo] = useMutation(update_todo_mutation);
  const [deleteTodo] = useMutation(delete_todo_mutation, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery({
        query: get_todos_query,
      });

      const deletedTodo = data["delete_todos_by_pk"];

      cache.writeQuery({
        query: get_todos_query,
        data: {
          ...(cachedData as any),
          todos: (cachedData as any).todos.filter(
            (t: Todo) => t.id !== deletedTodo.id
          ),
        },
      });
    },
  });

  return (
    <Flex
      key={todo.id}
      borderBottom="1px solid lightgrey"
      p="2"
      my="1"
      w="100%"
      justifyContent="space-between"
    >
      <Text fontSize="xl" textDecoration={todo.completed ? "line-through" : ""}>
        {todo.title}
      </Text>
      <Box>
        <Button
          variantColor="teal"
          size="sm"
          onClick={async () => {
            setUpdating(true);
            await updateTodo({
              variables: { id: todo.id, completed: !todo.completed },
            });
            setUpdating(false);
          }}
          isLoading={updating}
        >
          Toggle Completed
        </Button>
        <Button
          variantColor="red"
          size="sm"
          ml="2"
          onClick={async () => {
            setDeleting(true);
            await deleteTodo({ variables: { id: todo.id } });
          }}
          isLoading={deleting}
        >
          Delete
        </Button>
      </Box>
    </Flex>
  );
}
