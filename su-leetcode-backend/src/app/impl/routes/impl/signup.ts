import middleware from "../../middleware";
import { db } from "../../../../database";
import { tableName } from "../../../../database/impl/users";
import emitter, { Events } from "../../../../events";
import crypto from "crypto";
import { UserDB } from "../../../../types/impl/database/impl/users";

const handler = async (req: Request): Promise<Response> => {
    try {
        const url = new URL(req.url);
        const paths = url.pathname.split("/");
        paths.shift();

        const body =
            req.method === "POST"
                ? ((await req.json().catch(() => {
                      return null;
                  })) as Body)
                : null;

        const username = body?.username ?? paths[1] ?? url.searchParams.get("username") ?? null;
        if (!username) {
            return middleware.createResponse(JSON.stringify({ error: "No username provided." }), 400);
        }

        const password = body?.password ?? paths[2] ?? url.searchParams.get("password") ?? null;
        if (!password) {
            return middleware.createResponse(JSON.stringify({ error: "No password provided." }), 400);
        }

        const email = body?.email ?? paths[3] ?? url.searchParams.get("email") ?? null;
        if (!email) {
            return middleware.createResponse(JSON.stringify({ error: "No email provided." }), 400);
        }

        try {
            // Check if user already exists
            const userExists = (await db.read<UserDB>(tableName, { username })) as unknown as UserDB[] | null;
            if ((userExists?.length ?? 0) > 0) {
                return middleware.createResponse(JSON.stringify({ error: "User already exists." }), 400);
            }

            const user = await db.create(tableName, {
                id: crypto.randomUUID(),
                username,
                password: crypto.createHash("sha256").update(password).digest("hex"),
                email,
                created_at: new Date(Date.now()).toISOString(),
            });

            emitter.emit(Events.DATABASE_USERS_CREATE, user);

            return middleware.createResponse(JSON.stringify({ success: true }), 200);
        } catch (e) {
            console.error(e);
            return middleware.createResponse((e as { message: string }).message, 500);
        }
    } catch (e) {
        console.error(e);
        return middleware.createResponse(JSON.stringify({ error: "An error occurred." }), 500);
    }
};

const route = {
    path: "/signup",
    handler,
    rateLimit: 50,
};

type Body = {
    username: string;
    password: string;
    email: string;
};

export default route;
