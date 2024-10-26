import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z.union([
    z.literal("local"),
    z.literal("dev"),
    z.literal("test"),
    z.literal("stage"),
    z.literal("prod"),
  ]),
  NODE_ENV: z
    .union([
      z.literal("development"),
      z.literal("production"),
      z.literal("test"),
    ])
    .optional(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export { envSchema };
