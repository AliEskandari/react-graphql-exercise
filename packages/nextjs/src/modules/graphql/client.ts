import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL ?? "",
  {
    credentials: "include",
    mode: "cors",
    headers: {
      "apollo-require-preflight": "true",
    },
  }
);
export { client };
