import { Express, Request, Response } from "express";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { creatUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/healthcheck", (_, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validate(creatUserSchema), createUserHandler);

  app.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler);

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default routes;
