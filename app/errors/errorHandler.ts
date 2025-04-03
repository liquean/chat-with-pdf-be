import { NextFunction, Request, Response } from "express";
import { BaseCustomError } from "./BaseCustomError";

export default (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    next(error);
  }

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
