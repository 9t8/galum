"use client";

import { useUserData } from "@nhost/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const params = useSearchParams();

  const userData = useUserData();

  const [bio, setBio] = useState("");

  useEffect(
    () => setBio((userData?.metadata.bio ?? "") + ""),
    [userData?.metadata.bio]
  );

  if (params.get("id") === null) {
    return <h2>Missing User ID</h2>;
  }

  console.log(params.get("id"));

  return (
    <>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
    </>
  );
}
