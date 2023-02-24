import { db } from "../config/database.connection.js";

export async function checkEmailExistence(req, res, next){
    const {email} = req.body

    try{
        const query = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
        const user = query.rows[0]

        if(user){
            return res.sendStatus(409)
        }

        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}