import "dotenv/config";

import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    "https://qndsufruxlffqeirkxqm.graphql.us-east-1.nhost.run/v1": {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
      },
    },
  },
  documents: "components/*.tsx",
  generates: {
    "__generated__/": {
      preset: "client",
    },
  },
};

export default config;
