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

export async function getUrlById(req, res) {
    const {id} = req.params

    try{
        const query = await db.query(`SELECT * FROM urls WHERE id=$1`,[id])
        const url = query.rows[0]

        if(!url) return res.sendStatus(404)
        
        delete url.createdAt
        delete url.userId

        return res.status(200).send(url)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function openUrl(req, res) {
    const url = req.urlObject

    try{
        console.log(url)
        return res.send()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
} //res.redirect

export async function deleteUrl(req, res) {}
