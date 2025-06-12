import { Router } from "express";
import { asyncHandler } from "../../../handlers/asyncHandler.js";

export default function userRouter(userController) {
  const router = Router();
  const path = "/users";

  return router
    .get(`${path}`, asyncHandler(userController.getAll))
    .post(`${path}`, asyncHandler(userController.create))
    .put(`${path}/:id`, asyncHandler(userController.update))
    .delete(`${path}/:id`, asyncHandler(userController.delete));
}
