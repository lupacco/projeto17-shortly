import { Router } from "express";
import { getRanking } from "../controllers/ranking.controllers.js";

const usersRouter = Router()

usersRouter.get("/users/me", getRanking)

export default usersRouter