import express from 'express';
import cors from 'cors';
import cookieParse from "cookie-parser";

import errorHandler from './handlers/errorHandler.js';

export default function createServer( apiRouter ) {
  const app = express();

  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
  }));
  app.use(cookieParse());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(apiRouter);

  app.use(errorHandler);

  return app;
}