import { db } from "../config/database.connection.js";

export async function validateToken(req, res, next){
    const { authorization } = req.headers

    try{
        const query = await db.query(`SELECT * FROM sessions WHERE token=$1`, [authorization])
        const session = query.rows[0]

        if(!session) return res.sendStatus(401)

        req.session = session
        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}