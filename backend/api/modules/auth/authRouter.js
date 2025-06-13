import { Router } from "express";
import { asyncHandler } from "../../handlers/asyncHandler.js"; 

export default function authRouter(authController) {
  const router = Router();
  const path = "/auth";

  return router
    .post(`${path}/register`, asyncHandler(authController.register))
    .post(`${path}/sign-in`, asyncHandler(authController.signIn));
}
