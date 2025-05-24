import express from 'express';

export default function createServer( apiRouter ) {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(apiRouter);

  return app;
}