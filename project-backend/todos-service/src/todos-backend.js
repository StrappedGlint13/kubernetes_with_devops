const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')

const Todo = require('./Todo')

MONGODB_URI = process.env.API

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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
    allTodos: async (root, args) => Todo.find({}),
  },
  Mutation: {
    addTodo: (root, args) => {
      const todo = new Todo({ ...args })
      return todo.save()
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