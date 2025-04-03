import { NextFunction, Request, Response } from "express";
import { BaseCustomError } from "./BaseCustomError";
import bunyan from "bunyan";
import * as Sentry from "@sentry/node";

const log = bunyan.createLogger({ name: "chat-with-pdf" });

export default (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    next(error);
  }

  logError(error, req);
  res.status(getErrorCode(error)).json({ message: getErrorMessage(error) });
};

const getErrorMessage = (error: unknown) => {
  if (
    error instanceof Error ||
    (error && typeof error === "object" && "message" in error)
  ) {
    return String(error.message);
  } else if (typeof error === "string") {
    return error;
  }
  return "Unable to continue";
};

const getErrorCode = (error: unknown) => {
  if (
    error instanceof BaseCustomError ||
    (error && typeof error === "object" && "statusCode" in error)
  ) {
    return Number(error.statusCode);
  }
  return 500;
};

const logError = (error: any, req: Request) => {
  log.error("Time:", Date.now());
  log.error("Request Type:", req.method);
  log.error("Request URL:", req.originalUrl);
  log.error("Message:", error.message);

  Sentry.captureException(error);
};
