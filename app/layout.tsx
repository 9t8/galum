"use client";

import { NhostClient, NhostProvider } from "@nhost/nextjs";
import "@picocss/pico";

import Navbar from "@/components/Navbar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const nhost = new NhostClient({
  region: process.env.NEXT_PUBLIC_REGION,
  subdomain: process.env.NEXT_PUBLIC_SUBDOMAIN,
});

const apollo = new ApolloClient({
  uri: nhost.graphql.httpUrl,
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NhostProvider nhost={nhost}>
          <ApolloProvider client={apollo}>
            <Navbar />
            <main className="container">{children}</main>
          </ApolloProvider>
        </NhostProvider>
      </body>
    </html>
  );
}
