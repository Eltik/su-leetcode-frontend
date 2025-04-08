import emitter, { Events } from "..";
import colors from "colors";

export const listener = async () => {
    emitter.on(Events.DATABASE_CONNECT, async () => {
        console.log(colors.green("Database connected!"));
    });

    emitter.on(Events.DATABASE_INITIATED, async () => {
        console.log(colors.green("Initiated database!"));
    });

    emitter.on(Events.DATABASE_TABLE_CREATE, async (data) => {
        console.log(colors.gray(`Table created: ${data}`));
    });

    emitter.on(Events.DATABASE_USERS_CREATE, async (data) => {
        console.log(colors.gray(`User created: ${data?.user_id}`));
    });

    emitter.on(Events.DATABASE_USERS_UPDATE, async (data) => {
        console.log(colors.gray(`User updated: ${data?.user_id}`));
    });
};
