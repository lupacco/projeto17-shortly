import { db } from "../config/database.connection.js";

export async function getRanking(req, res) {
  try {
    const query = await db.query(`
        SELECT users.id AS user_id, 
        users.name AS user_name, 
        COUNT(urls.id) AS links_count, 
        COALESCE(SUM(urls."visitCount"), 0) AS visit_count
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY visit_count DESC
        LIMIT 10
        `);

    const ranking = query.rows

    return res.status(200).send(ranking)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
