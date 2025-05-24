import { Router } from "express";

export default function authRouter( authController ) { 
    const router = Router();
    const path = "/auth";

    router.post(`${path}/sign-in`, authController.signIn); // GET -> auht/sign-in
    // router.post(`${path}/sign-up`, authController.signUp);
    
    return router;
   
}