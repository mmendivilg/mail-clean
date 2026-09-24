import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const foundationMetadata = sqliteTable('foundation_metadata', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
});
