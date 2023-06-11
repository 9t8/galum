"use client";

import { NhostClient, NhostProvider } from "@nhost/nextjs";
import "@picocss/pico";

import Navbar from "@/components/Navbar";
import { NhostApolloProvider } from "@nhost/react-apollo";

const nhost = new NhostClient({
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
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
          <NhostApolloProvider nhost={nhost}>
            <Navbar />
            <main className="container">{children}</main>
          </NhostApolloProvider>
        </NhostProvider>
      </body>
    </html>
  );
}
