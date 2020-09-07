import { gql } from "@apollo/client";

export const add_todo_mutation = gql`
  mutation AddTodo($title: String!) {
    insert_todos_one(object: { title: $title }) {
      id
      title
      completed
    }
  }
`;

export const update_todo_mutation = gql`
  mutation UpdateTodo($id: Int!, $completed: Boolean!) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { completed: $completed }
    ) {
      id
      title
      completed
    }
  }
`;

export const delete_todo_mutation = gql`
  mutation DeleteTodo($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
      title
      completed
    }
  }
`;
