"use client";

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
        people(where: { user_id: { _eq: $id } }) {
          first_name
          last_name
          grad_year
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

  useEffect(
    () =>
      setBio(
        data
          ? data.profiles[0]?.bio ?? "Hi! I have not changed my bio yet."
          : "Loading..."
      ),
    [data]
  );

  if (!params.get("id")) {
    return <h3>Missing User ID</h3>;
  }

  if (data === undefined) {
    return <h3>Loading...</h3>;
  }

  const startEditing = () => {
    setBio(data?.profiles[0]?.bio ?? "");

    setEditing(true);
  };

  const saveProfile = async () => {
    await upsertProfile({ variables: { bio } });

    setEditing(false);
  };

  return (
    <>
      {data.people[0] ? (
        <>
          <h3>{`${data.people[0].first_name} ${data.people[0].last_name}`}</h3>
          {data.people[0].grad_year && (
            <p>{`Class of ${data.people[0].grad_year}.`}</p>
          )}
        </>
      ) : (
        <h3>Unverified User</h3>
      )}
      <h4>Bio</h4>
      {editing ? (
        <>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />{" "}
          <button onClick={saveProfile}>Save</button>
        </>
      ) : (
        <>
          <p style={{ whiteSpace: "break-spaces" }}>{bio}</p>
          {id === params.get("id") && (
            <span role="button" onClick={startEditing}>
              Edit
            </span>
          )}
        </>
      )}
    </>
  );
}
