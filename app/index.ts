import express from "express";
import filesRouter from "./routes/filesRouter";
import promptsRouter from "./routes/promptsRouter";
import cors from "cors";
import fileUploader from "express-fileupload";
import errorHandler from "./errors/errorHandler";
import "dotenv/config.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: "*" }));
app.use(fileUploader());

app.use("/files", filesRouter);
app.use("/prompt", promptsRouter);
app.use(errorHandler);

app.listen(port, () => {});
