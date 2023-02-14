import { Router } from "express";
import {
  createShortUrl,
  deleteUrl,
  getUrlById,
  openUrl,
} from "../controllers/urls.controllers";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/urlSchema.js";
import { urlByIdSchema } from "../schemas/urlByIdSchema.js";
import { checkUrlExistence } from "../middlewares/urlsValidations";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), createShortUrl);
urlsRouter.get("urls/:id", validateSchema(urlByIdSchema), getUrlById);
urlsRouter.get("/urls/open/:shortUrl", checkUrlExistence, openUrl)
urlsRouter.delete("urls/:id", checkUrlExistence, deleteUrl);

export default urlsRouter;
