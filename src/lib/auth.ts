import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { google } from "@lucia-auth/oauth/providers";
import { libSqlClient } from "./db";

export const auth = lucia({
  env: import.meta.env.DEV ? "DEV" : "PROD",
  middleware: astro(),
  adapter: libsql(libSqlClient, {
    key: "user_key",
    session: "user_session",
    user: "user",
  }),
  getUserAttributes: ({ avatar_url, name }) => {
    return {
      name,
      avatar_url,
    };
  },
});

//PUBLIC_VERCEL_URL is configured for Astro by vercel
const SITE_URL = import.meta.env.PROD
  ? "https://threadz-k.vercel.app"
  : "http://localhost:4321";

export const googleAuth = google(auth, {
  clientId: import.meta.env.GOOGLE_ID,
  clientSecret: import.meta.env.GOOGLE_SECRET,
  redirectUri: SITE_URL + "/callback",
});

export type Auth = typeof auth;
