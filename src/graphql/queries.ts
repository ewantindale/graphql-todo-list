import { gql } from "@apollo/client";

export const get_todos_query = gql`
  query GetTodos {
    todos(order_by: { created_at: desc }) {
      id
      title
      completed
    }
  }
`;
