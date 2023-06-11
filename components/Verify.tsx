"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Verify() {
  const params = useSearchParams();

  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {enabled && (
        <button
          disabled={loading}
          aria-busy={loading}
          onClick={async () => {
            setLoading(true);

            const result = await (await fetch(`api/verify?${params}`)).text();
            setMessage(result);
            if (result.startsWith("Success")) {
              setEnabled(false);
            }

            setLoading(false);
          }}
        >
          Complete Email Verification
        </button>
      )}
      {message && <p>{message}</p>}
    </>
  );
}
