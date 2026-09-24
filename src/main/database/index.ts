import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

export interface FoundationDatabase {
  close(): void;
}

export function openFoundationDatabase(path: string): FoundationDatabase {
  const sqlite = new Database(path);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS foundation_metadata (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    ) STRICT
  `);
  sqlite
    .prepare('INSERT OR IGNORE INTO foundation_metadata (key, value) VALUES (?, ?)')
    .run('schema_version', '001');
  drizzle(sqlite, { schema });

  return { close: () => sqlite.close() };
}
