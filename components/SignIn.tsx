"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignInEmailPassword } from "@nhost/nextjs";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    error,
  } = useSignInEmailPassword();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  const disableForm = isLoading || needsEmailVerification;

  return needsEmailVerification ? (
    <p>Please check your email and follow the verification link.</p>
  ) : (
    <form onSubmit={handleOnSubmit}>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={disableForm}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={disableForm}
        required
      />

      <button type="submit" disabled={disableForm} aria-busy={isLoading}>
        Sign in
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}
