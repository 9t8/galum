"use client";

import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

const QUERY = gql`
  {
    people(
      where: { grad_year: { _is_null: false } }
      order_by: [{ last_name: asc }, { first_name: asc }]
    ) {
      first_name
      last_name
      grad_year
    }
  }
`;

export default function AlumList() {
  const { data } = useQuery(QUERY);
  const alums = useMemo(
    () =>
      data &&
      data.people.reduce((acc: any[], alum: any) => {
        acc[alum.grad_year] = [...(acc[alum.grad_year] || []), alum];
        return acc;
      }, []),
    [data]
  );

  console.log(alums);

  return alums ? (
    alums.reduceRight(
      (acc: any[], year: any[], i: number) => [
        ...acc,
        <details key={i}>
          <summary>{i}</summary>
          <ul>
            {year.map((person: any, i: number) => (
              <li key={i}>{person.first_name + " " + person.last_name}</li>
            ))}
          </ul>
        </details>,
      ],
      []
    )
  ) : (
    <progress />
  );
}
