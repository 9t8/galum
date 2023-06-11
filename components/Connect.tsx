"use client";

import { SignedIn, SignedOut, useUserId } from "@nhost/nextjs";
import { useEffect, useState } from "react";

export default function Connect() {
  const id = useUserId();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => setLoading(!id), [id]);

  const handleSubmit = async () => {
    setLoading(true);
    const a = await fetch("api/send", { method: "POST" });
    console.log(await a.text());
    setLoading(false);
  };

  return (
    <>
      <SignedIn>
        <input
          type="text"
          placeholder="Pausd Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={handleSubmit} disabled={loading}>
          Send Email
        </button>
      </SignedIn>
      <SignedOut>
        <p>Sign in or sign up to connect your account.</p>
      </SignedOut>
    </>
  );
}
