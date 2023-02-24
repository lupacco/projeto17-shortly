import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { signUp, signIn } from "../controllers/auth.controllers.js";
import { checkEmailExistence, validateLogin } from "../middlewares/authValidations.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), checkEmailExistence, signUp);
authRouter.post("/signin", validateSchema(signInSchema), validateLogin, signIn);

export default authRouter;