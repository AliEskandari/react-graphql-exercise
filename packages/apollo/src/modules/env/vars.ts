import { envSchema } from "./env-schema";
import { env } from "@people-tech/env";
const vars = env.validateEnv(process.env, envSchema);

export { vars };
