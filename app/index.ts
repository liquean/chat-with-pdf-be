import * as Sentry from "@sentry/node";
import express from "express";
import filesRouter from "./routes/filesRouter";
import promptsRouter from "./routes/promptsRouter";
import cors from "cors";
import fileUploader from "express-fileupload";
import errorHandler from "./errors/errorHandler";
import "dotenv/config.js";

Sentry.init({
  dsn: "https://9eec2b4b9a63e2883225a070c51af59e@o4508906009919488.ingest.us.sentry.io/4509091819225088",
});

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: "*" }));
app.use(fileUploader());

Sentry.setupExpressErrorHandler(app);
app.use("/files", filesRouter);
app.use("/prompt", promptsRouter);
app.use(errorHandler);

app.listen(port, () => {});
