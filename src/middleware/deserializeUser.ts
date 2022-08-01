import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../util/jwt.utils";
import log from "../util/logger";

export async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh", "");

  if (!accessToken) {
    return next();
  }

  const verifyResponse = verifyJwt(accessToken);

  if (verifyResponse.decoded) {
    res.locals.user = verifyResponse.decoded;
    return next();
  }

  if (verifyResponse.expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.user = result.decoded;

    return next();
  }

  return next();
}
