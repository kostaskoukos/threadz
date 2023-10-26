import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
 
export const client = createClient({ url: import.meta.env.DB_URL!, authToken: import.meta.env.DB_TOKEN });
 
export const db = drizzle(client);

