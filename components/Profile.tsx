"use client";

//TODO: make sure signing out does not break this page, othrwise redirect to homepage on sign-out

import { graphql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const params = useSearchParams();

  const { data } = useQuery(
    graphql(`
      query selectBio($id: uuid!) {
        profiles(where: { user_id: { _eq: $id } }) {
          bio
        }
      }
    `),
    { variables: { id: params.get("id") } }
  );

  const [bio, setBio] = useState("");

  const [editing, setEditing] = useState(false);

  useEffect(
    () =>
      setBio(
        data?.profiles[0].bio ??
          'akdfj;asldkfja\n\naskdjf;alsdkj                                                                                                                                                                                                                                                                                                                                                                                                                                                       \n\n<a href="example.com"></a>'
      ),
    [data?.profiles]
  );

  if (params.get("id") === null) {
    return <h2>Missing User ID</h2>;
  }

  return editing ? (
    <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
  ) : (
    <div style={{ whiteSpace: "break-spaces" }}>{bio}</div>
  );
}
