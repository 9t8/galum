"use client";

import { useQuery } from "@apollo/client";
import { ReactElement, useMemo } from "react";

import { graphql } from "@/__generated__/gql";

const selectAlums = graphql(`
  query selectAlums {
    people(
      where: { grad_year: { _is_null: false } }
      order_by: [{ last_name: asc }, { first_name: asc }]
    ) {
      first_name
      last_name
      grad_year
    }
  }
`);

export default function AlumList() {
  const { data } = useQuery(selectAlums);

  const alums = useMemo(
    () =>
      data &&
      data.people.reduce((acc, alum) => {
        acc[alum.grad_year!] = [...(acc[alum.grad_year!] || []), alum];
        return acc;
      }, [] as (typeof data.people)[number][][]),
    [data]
  );

  return alums ? (
    <>
      {alums.reduceRight(
        (acc, year, i) => [
          ...acc,
          <details key={i}>
            <summary>{i}</summary>
            <ul>
              {year.map((person, i) => (
                <li key={i}>{person.first_name + " " + person.last_name}</li>
              ))}
            </ul>
          </details>,
        ],
        [] as ReactElement[]
      )}
    </>
  ) : (
    <progress />
  );
}
