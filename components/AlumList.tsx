"use client";

import { useNhostClient } from "@nhost/nextjs";
import { useEffect, useState } from "react";

const ALUMS = `{
  people(where: {grad_year: {_is_null: false}}, order_by: {grad_year: desc}) {
    first_name
    last_name
    grad_year
  }
}`;

export default function AlumList() {
  const nhost = useNhostClient();

  const [alums, setAlums] = useState<any>();

  useEffect(() => {
    (async () => {
      setAlums(await nhost.graphql.request(ALUMS));
    })();
  }, [nhost.graphql]);

  console.log(alums?.data.people);

  return <p>Done!</p>;
}
