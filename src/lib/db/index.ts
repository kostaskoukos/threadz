import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

export const libSqlClient = createClient({
  url: import.meta.env.PROD
    ? process.env.DB_URL!
    : "file:src/lib/db/database.sqlite",
  authToken: import.meta.env.DB_TOKEN,
});

export const db = drizzle(libSqlClient, {
  schema,
});
