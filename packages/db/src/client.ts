import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema/index.js';

export function databaseUrl(env: NodeJS.ProcessEnv = process.env): string {
  const url = env.DATABASE_URL;
  if (!url) {
    throw new Error('Falta la variable de entorno DATABASE_URL (ver infra/.env.example).');
  }
  return url;
}

export function createPool(url: string = databaseUrl()) {
  return mysql.createPool({ uri: url, connectionLimit: 10, decimalNumbers: false });
}

export function createDb(pool: ReturnType<typeof createPool>) {
  return drizzle(pool, { schema, mode: 'default' });
}

export type Db = ReturnType<typeof createDb>;
