import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schemas/user.schema";

export default function (app: Express) {
  /**
   * @method GET
   * @route /api/healthcheck
   * @description Healthcheck endpoint
   */
  app.get("/healthcheck", (_, res: Response) => {
    res.sendStatus(200);
  });

  /**
   * This endpoint is used to register a new user.
   * @method POST
   * @route /api/register
   */
  app.post("/register", validateRequest(createUserSchema), createUserHandler);

  /**
   * This endpoint is used to login a user.
   * @method POST
   * @route /api/login
   * @param {string} username The username of the user.
   * @param {string} password The password of the user.
   * @returns {string} The JWT token of the user.
   */
  app.post("/login", validateRequest(creatUserSessionSchema), createUserSessionHandler);

  /**
   * This api endpoint is responsible for returning all the users sessions.
   * @method GET
   * @route /api/sessions
   * @returns { sessions: Session[] } Returns an array of currently active sessions for the requesting user.
   */
  app.get("/sessions", async (req: Request, res: Response) => {
    res.status(400).send({ message: "Not implemented" });
  });

  /**
   * This endpoint is used to logout a user.
   * @method DELETE
   * @route /api/logout
   * @returns { message: String } The message of the response.
   */
  app.delete("/logout", async (req: Request, res: Response) => {
    res.status(400).send({ message: "Not implemented" });
  });
}
