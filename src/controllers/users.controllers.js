import { db } from "../config/database.connection.js";

export async function getUserByToken(req, res) {
  const userId = req.session.userId;

  try {
    const response = await db.query(
      `
            SELECT 
                users.id, 
                users.name, 
                COALESCE(SUM(urls."visitCount"), 0) AS "visitCount",
            CASE 
                WHEN COUNT(urls.id) = 0 
                    THEN 
                        ARRAY[]::json[]
                    ELSE 
                        ARRAY_AGG(json_build_object(
                            'id', urls.id,
                            'shortUrl', urls."shortUrl",
                            'url', urls.url,
                            'visitCount', urls."visitCount")
                        ) 
                END AS "shortenedUrls"
            FROM users
            LEFT JOIN urls ON users.id = urls."userId"            
            WHERE users.id = $1
            GROUP BY users.id;
            `,
      [userId]
    );
    return res.status(200).send(response.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
