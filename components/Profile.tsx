"use client";

//TODO: make sure signing out does not break this page, othrwise redirect to homepage on sign-out
// also actually save work lol

import { graphql } from "@/__generated__";
import { useMutation, useQuery } from "@apollo/client";
import { useUserId } from "@nhost/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const params = useSearchParams();

  const { data } = useQuery(
    graphql(`
      query selectProfile($id: uuid!) {
        profiles(where: { user_id: { _eq: $id } }) {
          bio
        }
      }
    `),
    { variables: { id: params.get("id") } }
  );

  const [upsertProfile] = useMutation(
    graphql(`
      mutation upsertProfile($bio: String!) {
        insert_profiles(
          objects: { bio: $bio }
          on_conflict: { constraint: profiles_pkey, update_columns: [bio] }
        ) {
          affected_rows
        }
      }
    `)
  );

  const [bio, setBio] = useState("");

  const [editing, setEditing] = useState(false);

  const id = useUserId();

  useEffect(() => setBio(data?.profiles[0]?.bio ?? ""), [data?.profiles]);

  if (params.get("id") === null) {
    return <h3>Missing User ID</h3>;
  }

  const saveProfile = () => {
    upsertProfile({ variables: { bio } });

    setEditing(false);
  };

  return editing ? (
    <>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} />{" "}
      <button onClick={saveProfile}>Save</button>
    </>
  ) : (
    <>
      <p style={{ whiteSpace: "break-spaces" }}>{bio}</p>
      {id === params.get("id") && (
        <span role="button" onClick={() => setEditing(true)}>
          Edit
        </span>
      )}
    </>
  );
}
