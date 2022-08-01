import mongoose from "mongoose";
import log from "./logger";


async function connect() {
  const url = process.env.DB_URL;

  if (!url) throw new Error("DB_URL is not defined");

  try {
    await mongoose.connect(url);
    log.info("Connected to database");
  } catch (e) {
    log.error(e);
    process.exit(1);
  }
}

export default connect;