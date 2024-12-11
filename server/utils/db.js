import pkg from 'pg';
const { Client } = pkg;
import { drizzle } from "drizzle-orm/node-postgres";

const config = useRuntimeConfig()

const client = new Client({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT, // Default PostgreSQL port
})
client.connect()

export const db = drizzle(client)


