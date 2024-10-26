import { graphql } from "@/modules/graphql";

graphql(`
  query Events {
    events {
      title
    }
  }
`);

export default function Page() {}
