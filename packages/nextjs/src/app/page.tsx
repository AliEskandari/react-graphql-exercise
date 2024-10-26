"use client";
import { useState, useEffect } from "react";
import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000"); // Apollo Server URL

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function Home() {
  const [users, setUsers] = useState<
    { id: string; name: string; email: string }[]
  >([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await client.request(GET_USERS);
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!name || !email) return;

    // Add a new user and refetch user list
    await client.request(ADD_USER, { name, email });
    const data = await client.request(GET_USERS);
    setUsers(data.users);
    setName("");
    setEmail("");
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <h2>Add User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
