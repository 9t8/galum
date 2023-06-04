"use client";

import { NhostClient, NhostProvider } from "@nhost/nextjs";
import "@picocss/pico";

import Navbar from "@/components/Navbar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const nhost = new NhostClient({
  subdomain: "qndsufruxlffqeirkxqm",
  region: "us-east-1",
});

const apollo = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
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
            <nav className="container">
              <Navbar />
            </nav>
            <main className="container">{children}</main>
          </ApolloProvider>
        </NhostProvider>
      </body>
    </html>
  );
}
