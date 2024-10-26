import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";
import { resolvers } from "./schema/resolvers.generated";
import { typeDefs } from "./schema/typeDefs.generated";
import { DefaultSession } from "next-auth";

export interface Context {}

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers: { ...resolvers },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  logger: console,
  formatError: (err: any) => {
    console.error(err);
    return err;
  },
});

(async () => {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        "http://localhost:3000",
        "http://localhost:4000",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {};
      },
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
