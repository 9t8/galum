"use client";

import { useUserId } from "@nhost/nextjs";
import { useState } from "react";

export default function Connect() {
  const id = useUserId();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return id ? (
    <>
      <input
        type="text"
        placeholder="Pausd Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        disabled={loading}
        aria-busy={loading}
        onClick={async () => {
          setLoading(true);

          setMessage(
            await (
              await fetch(
                `api/send?${new URLSearchParams({ id, to: email })}`,
                {
                  method: "POST",
                }
              )
            ).text()
          );

          setLoading(false);
        }}
      >
        Send
      </button>
      {message && <p>{message}</p>}
    </>
  ) : (
    <p>Sign in or sign up to connect your account.</p>
  );
}
