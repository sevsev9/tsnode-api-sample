import express from 'express';
import log from './util/logger';
import routes from './routes';
import connect from './util/connect';
import { readFile } from 'fs/promises';
import { deserializeUser } from './middleware/deserializeUser';

require("dotenv").config();

const app = express();

app.use(express.json());


app.use(deserializeUser);


// Get port from environment file
const port = parseInt(process.env.PORT ?? "3000");
app.listen(port, async () => {
    // attept to read private and public keys
    try {
        let keys = await Promise.all([
            readFile(process.env.PRIVATE_KEY_FILE ?? "rsa/private.key", "utf-8"),
            readFile(process.env.PUBLIC_KEY_FILE ?? "rsa/public.key", "utf-8"),
        ]);

        // set keys in environment
        process.env.PRIVATE_KEY = keys[0];
        process.env.PUBLIC_KEY = keys[1];
    } catch (e) {
        log.error("Could not read private or public key");
        process.exit(1);
    }


    // Connect to the MongoDB Database
    await connect();

    // Add routes to the app
    routes(app);


    log.info(`Server is running at http://${process.env.HOST}:${port}/`);
});
