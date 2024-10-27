import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { generateId } from "./modules/functions/generate-id";
import { Event, User } from "./modules/types";

// Sample data for users and events
const users: User[] = [
  { id: "1", email: "alice@snap.com" },
  { id: "2", email: "bob@snap.com" },
  { id: "3", email: "charlie@snap.com" },
];

const events: Event[] = [
  {
    id: "1",
    title: "Birthday Party",
    attendees: [users[0]!],
  },
  {
    id: "2",
    title: "Conference",
    attendees: [users[1]!, users[2]!],
  },
];

const typeDefs = `#graphql
  type User {
    id: String!
    email: String!
  }

  type Event {
    id: String!
    title: String!
    attendees: [User!]!
  }

  type Query {
    events: [Event!]!
  }

  type Mutation {
    addAttendee(email: String!): User!
  }
`;

const resolvers = {
  Query: {
    events: (): Event[] => {
      return events;
    },
  },
  Mutation: {
    addAttendee: (_: any, { email }: { email: string }): User | null => {
      const newUser = { id: generateId(), email };
      events.at(-1)?.attendees.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
