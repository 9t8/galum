import "dotenv/config";

import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  documents: "components/**.tsx",
  generates: {
    "__generated__/": {
      preset: "client",
    },
  },
};

export default config;
