import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";

const config: CodegenConfig = {
  schema: "packages/apollo/**/schema.graphql",
  documents: ["packages/nextjs/src/**/*.tsx", "packages/nextjs/src/**/*.ts"],

  generates: {
    "packages/apollo/src/schema": defineConfig({
      typesPluginsConfig: {
        enumsAsTypes: false,
      },
    }),
    "packages/nextjs/src/modules/graphql/__generated__/": {
      preset: "client",
    },
    "packages/nextjs/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
