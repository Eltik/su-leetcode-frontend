import dotenv from "dotenv";
dotenv.config();

import { listener } from "./events/impl/listener";
import app from "./app";
import { db } from "./database";

(async () => {
    await listener();

    await db.init();
    await app.start();
})();
