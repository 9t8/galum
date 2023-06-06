import { graphql } from "@/__generated__";

const selectProfile = graphql(`
  query selectProfile($id: uuid!) {
    profiles_by_pk(id: $id) {
      bio
    }
  }
`);

export default selectProfile;
