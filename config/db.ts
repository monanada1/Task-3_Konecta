// importing dependencies
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../models';
//Connection to the database
const sqlite = new Database('linknest.db');
export const db = drizzle(sqlite, { schema });
