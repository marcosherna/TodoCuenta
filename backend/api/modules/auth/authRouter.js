import { Router } from "express";
import { asyncHandler } from "../../handlers/asyncHandler.js";
// import authenticate from "../../middleware/authenticate.js";

export default function authRouter(authController, rolRouter, userRouter) {
  const router = Router();
  const path = "/auth";

  router.use(`${path}`, rolRouter);
  router.use(`${path}`, userRouter);

  return router
    .post(`${path}/register`, asyncHandler(authController.register))
    .post(`${path}/sign-in`, asyncHandler(authController.signIn));
}
