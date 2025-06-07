import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { links } from './links';

export const visits = sqliteTable('visits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  linkId: integer('link_id').references(() => links.id),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  country: text('country'),
  clickedAt: integer('clicked_at', { mode: 'timestamp' }).notNull(),
});
