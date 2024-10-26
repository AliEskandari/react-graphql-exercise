import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { v4 as uuidv4 } from "uuid";

// TypeScript interfaces for User and Event
type User = {
  id: string;
  name: string;
  email: string;
};

type Event = {
  id: string;
  title: string;
  date: string;
  attendees: User[];
};

// Sample data for users and events
const users: User[] = [
  { id: "1", name: "Alice", email: "alice@snap.com" },
  { id: "2", name: "Bob", email: "bob@snap.com" },
  { id: "3", name: "Charlie", email: "charlie@snap.com" },
];

const events: Event[] = [
  {
    id: "1",
    title: "Birthday Party",
    date: "2024-12-01",
    attendees: [users[0]!],
  },
  {
    id: "2",
    title: "Conference",
    date: "2024-11-15",
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
    addEvent(title: String!, date: String!): Event!
    deleteEvent(id: ID!): Boolean
    addAttendee(eventId: ID!, email: String!): User!
  }
`;

const resolvers = {
  Query: {
    events: (): Event[] => events,
  },
  Mutation: {
    addEvent: (
      _: any,
      { title, date }: { title: string; date: string }
    ): Event => {
      const newEvent = { id: uuidv4(), title, date, attendees: [] };
      events.push(newEvent);
      return newEvent;
    },
    deleteEvent: (_: any, { id }: { id: string }): boolean => {
      const index = events.findIndex((event) => event.id === id);
      if (index === -1) return false;
      events.splice(index, 1);
      return true;
    },
    addAttendee: (
      _: any,
      { eventId, name, email }: { eventId: string; name: string; email: string }
    ): User | null => {
      const event = events.find((event) => event.id === eventId);
      if (!event) return null;
      const newUser = { id: uuidv4(), name, email };
      event.attendees.push(newUser);
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
