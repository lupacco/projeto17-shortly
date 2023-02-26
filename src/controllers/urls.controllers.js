import { db } from "../config/database.connection.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
  const { url } = req.body;
  const shortUrl = nanoid();
  const session = req.session;
  const userId = session.userId;
  let urlId;

  try {
    const queryInsert = await db.query(
      `INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3)`,
      [shortUrl, url, userId]
    );

    if (queryInsert.rowCount === 1) {
      const { rows } = await db.query(`SELECT max(id) AS "urlId" FROM urls`);
      urlId = rows[0].urlId;
    }

    const frontRes = {
      id: urlId,
      shortUrl: shortUrl,
    };

    return res.status(201).send(frontRes);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getUrlById(req, res) {}

export async function openUrl(req, res) {} //res.redirect

export async function deleteUrl(req, res) {}
