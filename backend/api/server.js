import express from 'express';
import cors from 'cors';

import errorHandler from './handlers/errorHandler.js';

export default function createServer( apiRouter ) {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(apiRouter);

  app.use(errorHandler);

  return app;
}