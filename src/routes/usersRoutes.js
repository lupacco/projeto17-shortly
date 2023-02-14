import { Router } from "express";
import { getUserByToken } from "../controllers/users.controllers.js";
import { validateToken } from "../middlewares/validateToken.js";

const usersRouter = Router()

usersRouter.get("/users/me", validateToken, getUserByToken)

export default usersRouter