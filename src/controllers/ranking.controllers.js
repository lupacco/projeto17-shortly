import { db } from "../config/database.connection.js";

export async function getRanking(req, res) {
  try {
    const query = await db.query(`
        SELECT users.id AS "userId", 
        users.name AS "name", 
        COUNT(urls.id) AS "linksCount", 
        COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
        `);

    const ranking = query.rows
    console.log(ranking)
    return res.status(200).send(ranking)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
