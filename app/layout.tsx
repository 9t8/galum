"use client";

import Navbar from "@/components/Navbar";
import { NhostClient, NhostProvider } from "@nhost/nextjs";
import "@picocss/pico";

const nhost = new NhostClient({
  subdomain: "qndsufruxlffqeirkxqm",
  region: "us-east-1",
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
          <nav className="container">
            <Navbar />
          </nav>
          <main className="container">{children}</main>
        </NhostProvider>
      </body>
    </html>
  );
}
