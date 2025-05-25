import { Router } from "express";
import { asyncHandler } from "../../handlers/asyncHandler.js";

export default function authRouter(authController, rolRouter, userController) {
  const router = Router();
  const path = "/auth";

  router.use(`${path}`, rolRouter);

  //router.post(`${path}/sign-in`, authController.signIn); // GET -> auht/sign-in
  // router.post(`${path}/sign-up`, authController.signUp);

  return router
    .get(`${path}/users`, asyncHandler(userController.getAll))
    .post(`${path}/register`, asyncHandler(authController.register));
}
