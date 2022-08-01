import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import log from "../util/logger";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch(e: any) {
        log.error(e.message);
        return res.status(409).send(e.message);
    }
}