import { Router } from "express";
import { asyncHandler } from "../../../handlers/asyncHandler.js";

export default function branchRouter(branchController) {
  const router = Router();
  const PATH = "/branches";

  return router
    .post(PATH, asyncHandler(branchController.create))
    .get(PATH, asyncHandler(branchController.getAll))
    .get(`${PATH}/:id`, asyncHandler(branchController.getById))
    .put(`${PATH}/:id`, asyncHandler(branchController.update))
    .delete(`${PATH}/:id`, asyncHandler(branchController.delete));
}
