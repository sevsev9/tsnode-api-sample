import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import log from "../util/logger";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      log.info("Validation passed");

      next();
    } catch (e: any) {
      return res.status(400).json({ message: e.errors });
    }
  };

export default validate;
