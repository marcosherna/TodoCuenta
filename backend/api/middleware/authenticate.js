import { verify } from "../libs/jwt.js";
import Unauthorized from "../errors/unauthorized.js";

export default function authenticate(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) throw new Unauthorized("Token not provided");

    const user = verify(token);

    req.session = {
      user,
    };

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      throw new Unauthorized("Token expired");
    if (err.name === "JsonWebTokenError")
      throw new Unauthorized("Token invalid");
    next(err);
  }
}
