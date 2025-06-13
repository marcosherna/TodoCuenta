import { Router } from "express";

export default function administrationRouter(
  branchRouter,
  rolRouter,
  userRouter
) {
  const router = Router();
  const path = "/administration";

  router.use(`${path}`, branchRouter);
  router.use(`${path}`, rolRouter);
  router.use(`${path}`, userRouter);

  return router;
}
