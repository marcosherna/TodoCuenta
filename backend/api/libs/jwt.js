import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET_KEY || "my_secret_key"

const jwtOptions = {
    expiresIn: "1h",
}

export function sign(payload) {
    return jwt.sign(payload, SECRET_KEY, jwtOptions);
}

export function verify(token) {
    return jwt.verify(token, SECRET_KEY);
}