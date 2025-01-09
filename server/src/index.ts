import { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = `

type User {
  id: Int
  username: String
  name: String
  email: String
  }

type Todo { 
  id: Int
  userId: Int
  title: String
  completed: Boolean
  User: User
}


type Query {
  todos: [Todo]
}
`;

const resolvers = {
  Todo: {
    User: async (parent: any) => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${parent.userId}`);
      return response.data;
    },
  },
  Query: {
    todos: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
  },
};

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startApolloServer();
