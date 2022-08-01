import { Express, Request, Response } from "express";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { creatUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import requireUser from "./middleware/requireUser";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";

function routes(app: Express) {
  app.get("/healthcheck", (_, res: Response) => {
    res.sendStatus(200);
  });


  // Auth
  app.post("/api/users", validate(creatUserSchema), createUserHandler);

  app.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler);

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteSessionHandler);


  // Products
  app.post('/api/products', [ requireUser, validate(createProductSchema) ], createProductHandler);

  app.put('/api/products/:productId', [ requireUser, validate(updateProductSchema) ], updateProductHandler);

  app.get('/api/products/:productId', validate(getProductSchema), getProductHandler);

  app.delete('/api/products/:productId', [ requireUser, validate(deleteProductSchema)], deleteProductHandler);
  
}

export default routes;
