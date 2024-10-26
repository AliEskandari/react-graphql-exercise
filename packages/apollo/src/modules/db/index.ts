import { core, Schema } from "./core";
import { compositeKey } from "./composite-key";

const db = {
  core,
  compositeKey,
};

export { db };
export type Db = typeof db;
export type { Schema };
