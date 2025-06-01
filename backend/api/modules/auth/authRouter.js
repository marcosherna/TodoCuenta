import { Router } from "express";
import { asyncHandler } from "../../handlers/asyncHandler.js";
import authenticate from "../../middleware/authenticate.js";

export default function authRouter(authController, rolRouter, userController) {
  const router = Router();
  const path = "/auth";

  router.use(`${path}`, rolRouter);

  // router.post(`${path}/sign-up`, authController.signUp);

  return router
    .get(`${path}/users`, authenticate, asyncHandler(userController.getAll))
    .post(`${path}/register`, asyncHandler(authController.register))
    .post(`${path}/sign-in`, asyncHandler(authController.signIn));
}
