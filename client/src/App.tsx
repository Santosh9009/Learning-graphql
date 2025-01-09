import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import "./index.css"; 

const client = new ApolloClient({
  uri: "http://localhost:4000", 
  cache: new InMemoryCache(),
});

// Define GraphQL query
const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
      User {
        username
        name
        email
      }
    }
  }
`;

function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p className="text-gray-500 text-center mt-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">Error: {error.message}</p>;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Todos</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.todos.map((todo:any) => (
          <li
            key={todo.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-200"
          >
            <h3 className="text-lg font-bold text-gray-700 mb-2">{todo.title}</h3>
            <p className={`text-sm mb-2 ${todo.completed ? "text-green-500" : "text-yellow-500"}`}>
              {todo.completed ? "Completed" : "Incomplete"}
            </p>
            <div className="border-t border-gray-300 mt-3 pt-3">
              <p className="text-sm text-gray-600">
                <strong>User:</strong> {todo.User.name} (<span className="italic">{todo.User.username}</span>)
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {todo.User.email}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-600 text-white py-4 shadow-lg">
          <h1 className="text-center text-2xl font-bold">My First Apollo App 🚀</h1>
        </header>
        <main className="flex-grow">
          <Todos />
        </main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p className="text-sm">© 2025 Todos App - Built with Apollo and React</p>
        </footer>
      </div>
    </ApolloProvider>
  );
}
