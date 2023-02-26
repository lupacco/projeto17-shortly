import { Router } from "express";
import {
  createShortUrl,
  deleteUrl,
  getUrlById,
  openUrl,
} from "../controllers/urls.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/urlSchema.js";
import { checkUrlExistence } from "../middlewares/urlsValidations.js";
import { validateToken } from "../middlewares/validateToken.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateSchema(urlSchema),
  createShortUrl
);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", checkUrlExistence, openUrl);
urlsRouter.delete("/urls/:id", validateToken, checkUrlExistence, deleteUrl);

export default urlsRouter;