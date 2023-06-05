"use client";

import { graphql } from "@/__generated__";
import { useMutation } from "@apollo/client";
import { useUserId } from "@nhost/nextjs";

const upsertProfile = graphql(`
  mutation upsertProfile {
    insert_profiles(
      objects: { bio: "test2" }
      on_conflict: { constraint: profiles_pkey, update_columns: [bio] }
    ) {
      affected_rows
    }
  }
`);

const upsertProfile2 = graphql(`
  mutation upsertProfile2($bio: String!) {
    insert_profiles(
      objects: { bio: $bio }
      on_conflict: { constraint: profiles_pkey, update_columns: [bio] }
    ) {
      affected_rows
    }
  }
`);

export default function Profile() {
  const userId = useUserId();

  useMutation(upsertProfile);
  useMutation(upsertProfile2);

  return (
    <>
      <p>{userId || "Signed Out"}</p>
    </>
  );
}
