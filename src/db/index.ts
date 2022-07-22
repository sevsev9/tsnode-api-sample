import mongoose from "mongoose";
import log from "../logger";

export default function connect(uri: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    mongoose
      .connect(uri)
      .then(() => {
        log.info(`Connected to MongoDB at '${uri}'`);
        resolve();
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });
}
