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
    { variables: { id: params?.get("id") } }
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
  const [saving, setSaving] = useState(false);

  const id = useUserId();

  useEffect(() => setBio(data?.profiles[0]?.bio ?? ""), [data?.profiles]);

  if (!params?.get("id")) {
    return <h3>Missing User ID</h3>;
  }

  if (data === undefined) {
    return <h3 aria-busy>Loading...</h3>;
  }

  const saveProfile = async () => {
    setSaving(true);

    await upsertProfile({ variables: { bio } });

    setSaving(false);
    setEditing(false);
  };

  return (
    <>
      {data.people[0] ? (
        <hgroup>
          <h3>{`${data.people[0].first_name} ${data.people[0].last_name}`}</h3>
          {data.people[0].grad_year && (
            <p>{`Class of ${data.people[0].grad_year}`}</p>
          )}
        </hgroup>
      ) : (
        <h3>Unconnected User</h3>
      )}
      {editing ? (
        <>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            disabled={saving}
          />
          <button onClick={saveProfile} disabled={saving} aria-busy={saving}>
            Save
          </button>
        </>
      ) : (
        <>
          {id === params.get("id") && (
            <p>
              {!data.people[0] && (
                <>
                  <a role="button" className="contrast" href="connect">
                    Connect Account
                  </a>{" "}
                </>
              )}
              <span role="button" onClick={() => setEditing(true)}>
                Edit Profile
              </span>
            </p>
          )}
          {bio && <p style={{ whiteSpace: "break-spaces" }}>{bio}</p>}
        </>
      )}
    </>
  );
}
