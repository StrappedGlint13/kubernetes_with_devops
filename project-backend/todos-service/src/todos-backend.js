const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()

let todos = [
  { name: 'TODO 1' }, 
  { name: 'TODO 2' }
]

const typeDefs = gql`
  type Todo {
    name: String!
  }

  type Query {
    allTodos: [Todo!]!
  }

  type Mutation {
    addTodo(
      name: String!
    ): Todo
  }
`

const resolvers = {
  Query: {
    allTodos: async () => todos,
  },
  Mutation: {
    addTodo: (root, args) => {
      console.log(args)
      const todo =  { ...args }
      console.log(todo)
      todos = todos.concat(todo)
      console.log(todos)
      return todo
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})