import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

client.query({
  query: gql`
    query {
      todos {
        id
        title
        completed
        User {
          id
          username
          name
          email
        }
      }
    }
  `,
}).then(result=>console.log(result))

createRoot(document.getElementById("root")!).render(
  <StrictMode >
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </StrictMode>
);
