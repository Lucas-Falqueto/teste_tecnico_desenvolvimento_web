import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";
import router from "./routes/routes";
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(logger("dev"));
app.use("/", router);
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

export default app;
