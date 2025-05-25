import BaseError from "../errors/baseError.js";

export default function errorHandler(err, req, res, next) {
  if (err) {
    const isKnownError = err instanceof BaseError;
    const status = isKnownError && err.status ? err.status : 500;
    const message = isKnownError ? err.message : "Internal server error";
    const stackTrace = process.env.NODE_ENV === "production" ? null : err.stack;

    res.status(status).json({
      message,
      ...(isKnownError ? err.toJSON() : {}),
      stack: stackTrace,
    });
  }
  next();
}
