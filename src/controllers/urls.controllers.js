import { db } from "../config/database.connection.js";
import {nanoid} from "nanoid"

export async function createShortUrl(req, res){
    const shortUrl = nanoid()
    const session = req.session

    try{
        console.log(session)
        console.log(shortUrl)
        return res.sendStatus(201)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function getUrlById(req, res){}

export async function openUrl(req, res){} //res.redirect

export async function deleteUrl(req, res){}