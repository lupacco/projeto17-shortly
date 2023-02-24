import { db } from "../config/database.connection.js";
import bcrypt from "bcrypt"

export async function signUp(req, res){
    const {name, email, password} = req.body
    const hashPassword = bcrypt.hashSync(password, 10)

    try{
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,[name, email, hashPassword])

        return res.sendStatus(201)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function signIn(req, res){}