"use client";

//TODO: make sure signing out does not break this page, othrwise redirect to homepage on sign-out

import { graphql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const selectBio = graphql(`
  query selectBio($id: uuid!) {
    profiles(where: { user_id: { _eq: $id } }) {
      bio
    }
  }
`);

export default function Profile() {
  const params = useSearchParams();

  const { data } = useQuery(selectBio, { variables: { id: params.get("id") } });

  const [bio, setBio] = useState("");

  useEffect(() => setBio(data?.profiles[0].bio ?? ""), [data?.profiles]);

  if (params.get("id") === null) {
    return <h2>Missing User ID</h2>;
  }

  return (
    <>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
    </>
  );
}
