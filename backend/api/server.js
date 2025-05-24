import express from 'express';
import cors from 'cors';

export default function createServer( apiRouter ) {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(apiRouter);

  return app;
}