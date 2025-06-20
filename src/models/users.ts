import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  hashedPassword: text('hashed_password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
