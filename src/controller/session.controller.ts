import { Request, Response } from "express";
import { request } from "http";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../util/jwt.utils";
import log from "../util/logger";

export async function createUserSessionHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  // validate email and password
  const user = await validatePassword(email, password);
  if (!user) res.status(401).send("Invalid username or password");

  log.info(user);

  // create a session
  const session = await createSession(user._id, req.get("User-Agent") || "");

  try {
    // create an access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: process.env.ACCESS_TOKEN_TTL }
    );

    // create an refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: process.env.REFRESH_TOKEN_TTL }
    );

    // return the tokens
    res.status(200).send({ accessToken, refreshToken });
  } catch (e: any) {
    log.error(e);
    res.status(500).send(e.message);
  }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}


export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.status(200).send({
    accessToken: null,
    refreshToken: null,
  });
}