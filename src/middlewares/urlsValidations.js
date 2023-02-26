import { db } from "../config/database.connection.js";

export async function checkUrlExistence(req, res, next) {
  const { shortUrl } = req.params;

  try {
    const query = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [
      shortUrl,
    ]);
    const url = query.rows[0];

    if(!url) return res.sendStatus(404)

    req.urlObject = url
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
