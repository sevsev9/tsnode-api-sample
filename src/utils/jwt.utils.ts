import jwt from "jsonwebtoken";

const privateKey = process.env.JWT_SECRET as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, options);
}