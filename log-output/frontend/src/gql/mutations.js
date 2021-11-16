import { gql } from '@apollo/client'

export const ADD_TODO = gql`
  mutation addTodo($name: String!) {
    addTodo(
      name: $name,
    ) {
      name
    }
  }
`