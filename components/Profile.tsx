"use client";

import { useUserData } from "@nhost/nextjs";
import { useEffect, useState } from "react";

export default function Profile() {
  const userData = useUserData();

  const [bio, setBio] = useState("");

  useEffect(
    () => setBio("" + userData?.metadata.bio),
    [userData?.metadata.bio]
  );

  if (!userData) {
    return <p>Sign in to edit your profile.</p>;
  }

  return (
    <>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
    </>
  );
}
