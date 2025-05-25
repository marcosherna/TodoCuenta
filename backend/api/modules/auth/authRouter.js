import { Router } from "express";

export default function authRouter(authController, rolRouter) {
  const router = Router();
  const path = "/auth";

  router.use(`${path}`, rolRouter);

  router.post(`${path}/sign-in`, authController.signIn); // GET -> auht/sign-in
  // router.post(`${path}/sign-up`, authController.signUp);

  return router
    .get(`${path}/users`, authController.getAllUsers)
    .post(`${path}/register`, authController.register);
}
