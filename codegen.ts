import "dotenv/config";

import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `https://${process.env.NEXT_PUBLIC_SUBDOMAIN}.graphql.${process.env.NEXT_PUBLIC_REGION}.nhost.run/v1`,
  documents: "components/**.tsx",
  generates: {
    "__generated__/": {
      preset: "client",
    },
  },
};

export default config;
