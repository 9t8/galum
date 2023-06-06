"use client";

import { useUserData } from "@nhost/nextjs";

export default function Profile() {
  // use this because i can not fucking figure out the other way
  const userData = useUserData();

  if (!userData) {
    return <p>Sign in to edit your profile.</p>;
  }

  console.log(userData);

  return (
    <>
      <p>{userData.id}</p>
    </>
  );
}
