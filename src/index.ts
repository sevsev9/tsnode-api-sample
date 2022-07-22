import express from "express";
require('dotenv').config();
import log from "./logger";
import connect from './db';
import mongoose from "mongoose";
import routes from "./routes";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(parseInt(process.env.PORT ?? "8000"), process.env.HOST ?? "localhost", async () => {
    routes(app);

    log.info(`Server started at http://${process.env.HOST ?? "localhost"}:${process.env.PORT ?? "8000"}`);
    
    // Attempt to connect to the database
    connect(process.env.MONGODB_URI ?? "mongodb://localhost:27017/api").then(() => {
        log.info("Connected to MongoDB");
    }).catch((err) => {
        log.error(err);
    });


    // Catch CTRL+C and attempt to shut down gracefully
    process.on('SIGINT', async function() {
        log.info("Caught SIGINT, shutting down gracefully...");
        await mongoose.disconnect();
        try {
            server.close();
        } catch (err) {
            log.error(`An error occurred while closing the server: ${err}`);
            process.exit(1);
        }
        process.exit(0);
    });
});
