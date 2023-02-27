import { db } from "../config/database.connection.js";

export async function checkShortUrlExistence(req, res, next) {
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

export async function checkUrlExistenceById(req, res, next){
  const {id} = req.params

  try{
    const query = await db.query(`SELECT * FROM urls WHERE id=$1`, [id]);
    const url = query.rows[0];

    if (!url) return res.sendStatus(404);

    req.urlObject = url
    next()
  }catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export function checkIfUrlMatchUser(req, res, next){
  const url = req.urlObject
  const session = req.session

  try{
    if(url.userId !== session.userId) return res.sendStatus(401)
    
    next()
  }catch(err){
    console.log(err);
    return res.sendStatus(500);
  }
}
