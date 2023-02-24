import { db } from "../config/database.connection.js";
import bcrypt from "bcrypt"

export async function checkEmailExistence(req, res, next){
    const {email} = req.body

    try{
        const query = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
        const user = query.rows[0]

        //In case user already exist
        if(user) return res.sendStatus(409)

        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function validateLogin(req, res, next){
    const {email, password} = req.body

    try{
        const query = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
        const user = query.rows[0]

        if(!user || !bcrypt.compareSync(password, user.password)) return res.sendStatus(401)

        req.user = user
        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}