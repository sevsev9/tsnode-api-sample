import { sign } from "../utils/jwt.utils";
import { LeanDocument } from "mongoose";
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";

export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({
        user: userId,
        userAgent,
    });

    return session.toJSON();
}

export async function createAccessToken({
    user,
    session,
}: {
    user:
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "password">>;
    session: 
        | Omit<SessionDocument, "password">
        | LeanDocument<Omit<SessionDocument, "password">>;
}) {
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: process.env.ACCESS_TOKEN_TTL ?? "1h" }
    );

    return accessToken;
}
