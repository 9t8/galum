"use client";

import { useUserId } from "@nhost/nextjs";

export default function Profile() {
  const userId = useUserId();

  if (!userId) {
    return <p>Sign in to edit your profile.</p>;
  }

  return (
    <>
      <p>{userId}</p>
    </>
  );
}
