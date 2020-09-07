import { useMutation } from "@apollo/client";
import { Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { add_todo_mutation } from "../graphql/mutations";
import { get_todos_query } from "../graphql/queries";
import { InputField } from "./InputField";

export default function AddTodo() {
  const [submitting, setSubmitting] = useState(false);

  const [addTodo] = useMutation(add_todo_mutation, {
    update: (cache, { data }) => {
      const cachedData = cache.readQuery({
        query: get_todos_query,
      });

      const newTodo = data["insert_todos_one"];

      cache.writeQuery({
        query: get_todos_query,
        data: {
          ...(cachedData as any),
          todos: [newTodo, ...(cachedData as any).todos],
        },
      });
    },
  });

  return (
    <Formik
      initialValues={{ title: "" }}
      onSubmit={async (values) => {
        if (values.title.length < 3) {
          return;
        }
        setSubmitting(true);
        await addTodo({
          variables: { title: values.title ? values.title : null },
        });
        setSubmitting(false);
        values.title = "";
      }}
    >
      {() => (
        <Form>
          <Flex
            align="flex-end"
            justify="space-between"
            borderBottom="1px solid black"
            paddingBottom="5"
            marginBottom="5"
          >
            <InputField name="title" placeholder="title" label="Title" />
            <Button variantColor="teal" isLoading={submitting} type="submit">
              Add Todo
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
