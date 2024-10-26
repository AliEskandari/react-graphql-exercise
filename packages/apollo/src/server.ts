import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { v4 as uuidv4 } from "uuid";

// Step 1: Define TypeScript types for Event and User
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

// Sample data for events and users
const events: Event[] = [
  { id: "1", title: "Birthday Party", date: "2024-12-01", attendees: [] },
  { id: "2", title: "Conference", date: "2024-11-15", attendees: [] },
];

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Event {
    id: ID!
    title: String!
    date: String!
    attendees: [User!]!
  }

  type Query {
    events: [Event!]!
  }

  type Mutation {
    addEvent(title: String!, date: String!): Event!
    deleteEvent(id: ID!): Boolean
    addAttendee(eventId: ID!, name: String!, email: String!): User!
  }
`;

const resolvers = {
  Query: {
    events: (): Event[] => {
      return events;
    },
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
