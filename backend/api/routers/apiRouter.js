import { Router } from "express";

export default function apiRouter( authRouter) {

    const version = process.env.API_VERSION || "v1";
    const apiPrefix = `/api/${version}`;

    const router = Router();

    router.use(`${apiPrefix}`, authRouter);

    return router;
}