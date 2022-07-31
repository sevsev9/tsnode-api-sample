import { validatePassword } from "../service/user.service";
import { Request, Response } from "express";
import { createSession, createAccessToken } from "../service/session.service";
import { sign } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
    // validate email & password
    const user = validatePassword(req.body);

    if (!user) {
        res.status(400).send({ message: "Invalid email or password" });
        return;
    }

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");
 

    // create access token
    const accessToken = createAccessToken({ user, session });

    const refreshToken = sign(session, {
        expiresIn: process.env.REFRESH_TOKEN_TTL ?? "1d",
    });


    // create refresh token
    // send back access & refresh tokens
}