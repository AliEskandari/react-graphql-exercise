// if (!process.env.DOTENV_PATH) {
//   throw new Error("DOTENV_PATH is required");
// }

// require("dotenv").config({ path: process.env.DOTENV_PATH });
import { envSchema } from "./env-schema";
import { env } from "@people-tech/env";
const vars = env.validateEnv(process.env, envSchema);

export { vars };
