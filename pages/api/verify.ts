import createConnectionPool, { sql } from "@databases/pg";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = createConnectionPool();

  try {
    if (!req.query.id) {
      return res.send("Error: missing id.");
    }
    const id = req.query.id + "";
    if (id.length !== 36) {
      return res.send("Error: invalid id.");
    }

    if (!req.query.secret) {
      return res.send("Error: missing secret.");
    }
    const secret = req.query.secret + "";
    if (secret.length !== 344) {
      return res.send("Error: invalid secret.");
    }

    const [verifReq] = await db.query(sql`
    SELECT pausd_email FROM verifications
      WHERE user_id = ${id}
        AND secret = ${secret}
        AND now() - updated_at < INTERVAL '1 hour'
    `);
    if (!verifReq) {
      return res.send("Error: valid verification request not found.");
    }

    await db.query(sql`
    DELETE FROM verifications
      WHERE user_id = ${id};
    UPDATE people SET user_id = ${id}
      WHERE pausd_email = ${verifReq.pausd_email}
    `);

    res.send("Success, your account is connected.");
  } catch (e) {
    res.status(500).send("Error: internal server error.");
    console.error(e);
  } finally {
    // todo is this necessary?
    await db.dispose();
  }
}
