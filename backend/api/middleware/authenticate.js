import { verify } from "../libs/jwt.js"
import Unauthorized from "../errors/unauthorized.js";

export default function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
        next(new Unauthorized("No token provided"))

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verify(token);
        req.user = decoded;
        next();
    } catch (err) {
        next(new Unauthorized("Invalid or expired token"))
    }
}