import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
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
    addAttendee(eventId: ID!, email: String!): User!
  }
`;

const resolvers = {
  Query: {
    events: (): Event[] => events,
  },
  Mutation: {
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
