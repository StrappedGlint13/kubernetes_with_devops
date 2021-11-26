const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
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
    addTodo: async (root, args) => {
      const todo = new Todo({ ...args })

      if (todo.name.length > 140) {
        console.log('Too long todo!')
        return
      }

      return todo.save()
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()
server.applyMiddleware({ app })

app.get('/', async (req,res) => {
  console.log('for health check')
  res.status(200).end()
})

app.listen({ port: 4000 }, () => 
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)