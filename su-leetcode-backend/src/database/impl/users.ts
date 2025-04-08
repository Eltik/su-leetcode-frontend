import { z } from "zod";
import { withDbMetadata } from "..";
import { env } from "../../env";

export const tableName = `${env.DATABASE_NAME}_users`;

export const userSchema = z.object({
    id: withDbMetadata(z.string(), { primaryKey: true, notNull: true }),
    username: withDbMetadata(z.string(), { notNull: true }),
    password: withDbMetadata(z.string(), { notNull: true }),
    email: withDbMetadata(z.string(), { notNull: true }),
    created_at: withDbMetadata(z.string(), { notNull: true }),
});
