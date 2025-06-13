import { Router } from "express";
import authenticate from "../middleware/authenticate.js";

export default function apiRouter(authRouter, administrationRouter) {
  const version = process.env.API_VERSION || "v1";
  const apiPrefix = `/api/${version}`;

  const router = Router(); 
  router.use(`${apiPrefix}`, authRouter);

  router.use(`${apiPrefix}`,authenticate);

  router.use(`${apiPrefix}`, administrationRouter);

  return router;
}
