import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .union([
      z.literal("development"),
      z.literal("production"),
      z.literal("test"),
    ])
    .optional(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_PROJECT_ID: z.string(),
  NEXT_PUBLIC_GRAPHQL_SERVER_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
});

export { envSchema };
