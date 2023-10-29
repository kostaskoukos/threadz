import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url:
      process.env.NODE_ENV === "production"
        ? process.env.DB_URL!
        : "file:src/lib/db/database.sqlite",
    authToken: process.env.DB_TOKEN!,
  },
  driver: "turso",
} satisfies Config;
