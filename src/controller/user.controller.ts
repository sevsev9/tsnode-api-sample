import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (err) {
    log.error(err);
    res.status(409).send(err.message);
  }
}


export async function createUserSessionHandler(req: Request, res: Response) {
    try {
        // validate that the email is registered
        // validate that the password is correct
        // create a session
        // create access token
        // create refresh token
        // send access and refresh token back to the user
    } catch (err) {
        log.error(err);
        res.status(409).send(err.message);
    }
}