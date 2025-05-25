import { Router } from "express";

export default function rolRouter(rolController) {
  const router = Router();
  const path = "/rol";

  return router.get(path, rolController.getAll);
  // .get(`${path}/:id`, rolController.getById)
  // .post(path, rolController.create)
  // .put(`${path}/:id`, rolController.update)
  // .delete(`${path}/:id`, rolController.remove)
}
