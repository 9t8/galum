"use client";

import { useNhostClient } from "@nhost/nextjs";

const ALUMS = `{
  people(where: {grad_year: {_is_null: false}}, order_by: {grad_year: desc}) {
    first_name
    last_name
    grad_year
  }
}`;

export default function TestButton() {
  const nhost = useNhostClient();

  const createTestPerson = async () => {
    console.log(await nhost.graphql.request(ALUMS));
  };

  return <button onClick={createTestPerson}>Create Test Person</button>;
}
