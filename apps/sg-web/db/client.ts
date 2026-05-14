import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
    var _db: ReturnType<typeof drizzle> | undefined;
}

function createDb() {
    const client = postgres(process.env.DATABASE_URL!, {
        max: process.env.NODE_ENV === "production" ? 10 : 1, // connection pool size
    });
    return drizzle(client, { schema });
}

export const db =
    process.env.NODE_ENV === "production" ? createDb() : (global._db ?? (global._db = createDb()));
