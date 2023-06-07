"use client";

import { useQuery } from "@apollo/client";
import { ReactElement, useMemo } from "react";

import { graphql } from "@/__generated__";

export default function AlumList() {
  const { data } = useQuery(
    graphql(`
      query selectAlums {
        account: people(
          where: {
            grad_year: { _is_null: false }
            user_id: { _is_null: false }
          }
          order_by: [{ last_name: asc }, { first_name: asc }, { user_id: asc }]
        ) {
          first_name
          last_name
          grad_year
          user_id
        }
        no_account: people(
          where: { grad_year: { _is_null: false }, user_id: { _is_null: true } }
          order_by: [{ last_name: asc }, { first_name: asc }]
        ) {
          first_name
          last_name
          grad_year
        }
      }
    `)
  );

  const groupedByYear = useMemo(
    () =>
      data &&
      [...data.account, ...data.no_account].reduce((acc, e) => {
        acc[e.grad_year!] = [...(acc[e.grad_year!] || []), e];
        return acc;
      }, [] as (typeof data.account)[number][][]),
    [data]
  );

  return groupedByYear ? (
    <>
      {groupedByYear.reduceRight(
        (acc, year, i) => [
          ...acc,
          <details key={i}>
            <summary>{i}</summary>
            <ul>
              {year.map((person, i) => (
                <li key={i}>
                  {person.user_id ? (
                    <a href={`profile?id=${person.user_id}`}>
                      {`${person.first_name} ${person.last_name}`}
                    </a>
                  ) : (
                    `${person.first_name} ${person.last_name}`
                  )}
                </li>
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
