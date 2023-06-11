import { randomBytes } from "crypto";
import { createTransport } from "nodemailer";
import createConnectionPool, { sql } from "@databases/pg";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = createConnectionPool();
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    if (!req.query.id || !req.query.to) {
      return res.send("Error: missing query arguments(s).");
    }

    const id = req.query.id + "";
    if (id.length !== 36) {
      return res.send("Error: invalid id.");
    }

    const to = req.query.to + "";
    if (to.length > 255) {
      return res.send("Error: target email exceeds length limit.");
    }

    const [existingConnection] = await db.query(sql`
    SELECT user_id FROM people
      WHERE user_id = ${id}
    `);
    if (existingConnection) {
      return res.send("Error: user is already connected.");
    }

    const [recentVerif] = await db.query(sql`
    SELECT updated_at FROM verifications
      WHERE user_id = ${id}
        AND now() - updated_at < INTERVAL '10 minutes'
    `);
    if (recentVerif) {
      return res.send("Error: wait 10 minutes between requests.");
    }

    const [emails] = await db.query(sql`
    SELECT a.email, b.pausd_email
      FROM (
        SELECT email FROM auth.users
          WHERE id = ${id}
      ) as a, (
        SELECT pausd_email FROM people
          WHERE pausd_email = ${to}
      ) as b
    `);
    if (!emails) {
      return res.send("Error: user and/or person not found.");
    }

    const secret = randomBytes(258).toString("base64");

    await db.query(sql`
    INSERT INTO verifications (user_id, pausd_email, secret)
      VALUES (${id}, ${to}, ${secret})
      ON CONFLICT (user_id) DO UPDATE
      SET
        pausd_email = ${to},
        secret = ${secret}
    `);

    await transporter.sendMail({
      from: process.env.FROM_ADDR,
      to,
      subject: `${emails.email} wants to connect their Gunn Alumni account`,
      html: `
      <!DOCTYPE html>
      <html>

      <head>
        <meta charset="utf-8" />
      </head>

      <body>
        <p>${
          emails.email
        } wants to connect your email address to their Gunn Alumni account. If you sent this request, <a href="${
        process.env.VERIFY_PAGE
      }?id=${id}&secret=${encodeURIComponent(secret)}">verify here</a>.</p>
        <p>If you did not send this request, ignore this email.</p>
      </body>

      </html>
      `,
    });

    res.send("Success, check your inbox.");
  } catch (e) {
    res.status(500).send("Error: internal server error.");
    console.error(e);
  } finally {
    // todo are these necessary?
    transporter.close();
    await db.dispose();
  }
}
