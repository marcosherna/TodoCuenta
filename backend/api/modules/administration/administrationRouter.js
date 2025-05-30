import { Router } from "express";

export default function administrationRouter(branchRouter) {
  const router = Router();
  const path = "/administration";

  router.use(`${path}`, branchRouter);

  return router;
}
