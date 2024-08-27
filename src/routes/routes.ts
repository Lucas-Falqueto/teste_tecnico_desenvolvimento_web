import express, { Router } from "express";
import { uploadImageController } from "../controllers/uploadImageController";
import validateRequestImage from "../middlewares/valideateResquestImageMiddleware";
import path from "path";
import { confirmController } from "../controllers/confirmController";
import { customerGetController } from "../controllers/customerGetController";

const router = Router();

router.post("/upload", validateRequestImage, uploadImageController);

router.patch("/confirm", confirmController);

router.get("/:customer_code/list?", customerGetController);

export default router;
