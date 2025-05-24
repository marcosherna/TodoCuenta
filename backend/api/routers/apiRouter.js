import { Router } from "express";

export default function apiRouter() {

    const version = process.env.API_VERSION || "v1";
    const apiPrefix = `/api/${version}`;

    const router = Router();

    return router;
}