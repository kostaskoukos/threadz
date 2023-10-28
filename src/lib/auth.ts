import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { libSqlClient } from "./db";

export const auth = lucia({
  env: import.meta.env.DEV ? "DEV" : "PROD",
  middleware: astro(),
  adapter: libsql(libSqlClient, {
    key: "user_key",
    session: "user_session",
    user: "user",
  }),
});

export type Auth = typeof auth;
